

## System Design
#### API
To start off, we have an API that allows a user to create, delete, and get info about a resource. The controller behind the route does some simple validation (including checking if the url provided is a valid URI), and does what the endpoint says it will do (e.g. save a record, get a record, etc.)
#### DB
I implemented a postgres DB to save information that the app needs to preserve. One of the main reasons for choosing postgres for this challenge was for the `jsonb` field data type. The benefits of using this data type within a Result would allow us to index, query and process Results based off of the data field. Beyond that, I've had more success scaling systems that rely on postgresql over mysql due to the querying performance speed.
#### Queue system and Asynchronous Worker 
When a Reference is created, we send the Reference to a queue to be processed and ultimately generate a Result. In this case we don't want to make the user wait the extra few seconds it takes process a Reference, so we queue up the message for processing.
Normally the queue would be hosted via AWS SQS, however for the local instance I'm mocking the SQS queue using elasticMQ.
Currently I'm using an AWS lambda to pull a message off the queue and process the Reference and generate the Result. I discuss in the next sections on why I'd prefer using a framework such as NestJS to create a service with fewer restrictions than a lambda for something like this.

## Things I want to add or done differently
#### Add Audit fields, Reference versioning, and change when a Result is saved vs updated
For this project I opted to go with the simplest design implementation where a resource cannot be updated, and a new Result is created every time a Reference is reprocessed. 

If I were to spend more time building the app out, I would have done a deep comparison on the latest saved Result for a Reference and create a new Result if the title/meta tags have changed. This lets us avoid saving duplicate Results while maintaining a complete history log of the changes that occured to a Reference's Result.

I would have also added an audit field that stores when a Reference was last processed and a field to the Result to store when the Result was last compared against. In a real life situation, I'd also collaborate with the product team to see what other auditing data points we want stored. It's usually important for a product team, customer success team, or dev team to be able to have auditing information available. This gives insights to our customers when needed and allows the dev team to keep track of a system's health and be proactive about failing systems.

Another piece to consider when designing such a system is whether we want to allow the user to update a Reference. While the task of updating or patching a resource is simple enough, we want to make sure that the changes are reflected in the resource's data structure. I've found that having a versioning system allows us to keep track of when a change was made at what point in time and understand the effects that change has on child resources. There are a couple ways to implement such a system and it really does depend on many factors including what the product team is looking to get out. There are many trade offs involved and so it take a fair amount of discussion on how best to implement.

#### Unit & Integrations tests
Using Jest would have made easy work with testing the individual functions to make sure the building blocks I used to build services work correctly in all the different cases we might encounter in a production environment. SuperTest enables us to run integration and end to end test for this app. We'd be able to set up the environment and simulate a user's experience and check that the appropriate services are triggered and perform correctly. Ultimately, with enough coverage, we'd be able to speed up our development cycle by catching mistakes early on.

#### Global and Specific Error Handling
I would have loved to get into the specifics when it comes to catching specific types of errors and handling each error differently. I did implement this in the Reference creation controller. In the case the validation failed, I would return a 400. In the case our system wasn't able to create the Reference, I would return a 500. But in the case the system was able to create the Reference but unable to queue it up for processing, it would return a 202, with a note mentioning that the Reference would be processed later. 

It take a lot of time to implement error handling for specific exceptions throughout an entire app, but the result of cleaner code and better user experience is definitely worth it.

I'd also like to have included a global error handler so that we gracefully handle the error and so that the service doesn't crash and become unavailable for everyone else.

#### Logging and Monitoring tool
Another important piece for product ready code is to have a health monitoring system and place to store and monitor logs. This gives the dev team tons of insight into what is going on with the system and can alert the team as soon as some issue pops up.

#### Authentication & Authorization
App security is key for many obvious reasons. Whether it's to protect against malicious requests or limit usage of an API, it's very important to make sure the API is only being used by the correct people and applications. Implementing this using some of the modern Auth solutions such as Oauth is really simple and allows us to restrict or give permission to specific users.

#### API & Usage Docs
When it comes to using an API, there are a lot of assumptions one can make when interacting with it and so it's important to clear up the ambiguity and abstractions. I find that building out API docs along with a Swagger UI makes the developer experience optimal. The written docs can include step by step details on how to access and use the API correctly, while the Swagger UI is a convenient way to make sure the requests made to the API are correct from a syntax and format perspective. Obviously, docs are only as effective as the developer makes them, so it's important to be clear, precise, and unambiguous (there are a ton of good examples out there such as Stripe and Twilio).

#### A Different ORM
One of the biggest (and silliest) challenges I faced during this project was working with the ORM. I chose typeORM since it integrates well with typescript and was supposed to ease out the development process while sticking to typescript best practices. I had previously used this ORM and found it reliable, however that changed when they deprecated a few of their old methods and best practices. The change ultimately led me to discover a handful of bugs when it comes to working with relations (and I'm sure many more because they currently have 1.7k issues open on the repo). 

It was a frustrating experience because the ORM wasn't doing what the documentation said it should do, and so it took some time to figure out a workaround while maintaining good practices. It is, however, an open source library and for a product with no official funding, and such few developers, it still is a great tool. I was looking into an alternative after running into some issues and found prisma. It looks like a great ORM that integrates with typescript well, it also has tons of features, including connection management when using it in a FaaS architecture (such as AWS lambdas)

#### Using a Server Side App Framework
Although I feel that the technologies used within this project are solid as is, I think it could scale better when using an opinionated framework like NestJS. The nice thing about a framework like NestJS is having all the extra features I needed all within a bundled package. For example, I wouldn't have needed to use an AWS lambda to listen on a queue or schedule any events, NestJS has built in queues and listeners that would speed up development a ton. It really does speed up the development of highly scalable server side apps. 

I would like to mention though, while lambdas would work fine for a small task such as using it as a worker to get the title and meta tags from a website, in reality the worker jobs usually handle larger tasks that take a lot more time. With lambdas having a max runtime of 15 minutes, it becomes risky to use them for larger jobs that need to be done asynchronously since they don't handle timing out gracefully and it becomes hard to monitor and log timeouts. 

Furthermore, Lambdas have limitations in terms of the environment that the code gets run in. Running puppeteer in a lambda using serverless offline (as opposed to in a production environment) allowed me to avoid the constraint of limited package size for the lambda function. Puppeteer and the chromium browser that comes with it is too large, and so people have developed alternative such as using the chrome-aws-lambda package to shrink the dependency file size, which is not ideal since that package uses a much older version of puppeteer and has some deprecated and unsupported dependencies. Another workaround is to upload the function to S3 manually and point the lambda to hit what is in the S3 bucket.

Using a progressive framework like NestJS will help you avoid many unforeseen problems that you can encounter with lambdas since they have built in queue systems, jobs, and listeners that let you build a similar service that can run jobs in the background. Just to mention as well, NestJS follows the 12 factor app pattern and so it makes building a high quality highly scalable apps very simple.

#### Automated Startup & CI/CD
When it comes to running and deploying the app, there needs to be a pipeline to run checks, tests, linting, and building so that every deployment is consistent and to make sure that deploys are intentional. It's something I feel is necessary to maintain a system's reliability. I'd also want to make sure that the serverless file is configured correctly to handle multiple environments and make deployments to each environment as simple as adding a stage flag.

#### Webhooks/Messaging system
In the hypothetical, we may want other companies/vendors to integrate with our API, we'd want to make sure that there is a webhook system so that the company build an event based app, and not require them to query our API x times every hour. I would have another service that deals with sending these messages and we'd be able to queue up a message to be sent when a new result is generated. Ultimately this helps with scalability and reducing costs.
