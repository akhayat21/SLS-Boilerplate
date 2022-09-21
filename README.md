## Overview
This is a service that allows a user to capture title and meta tags for a specified website. Made by Allaa Khayat.

The app has 2 pieces that can be run individually. The API, DB, and Queue hosting service can be run through docker. While the scheduler, worker, and AWS SQS can be run through serverless offline.

#### Technologies used for this application is as follows:

- Express
- Postgres
- TypeORM
- TypeScript
- Docker
- Serverless 
- ESLint & Prettier
- Joi
- Puppeteer


## Setup Guide

1. Change directory into the root folder
2. Copy the `/env.example` into a `.env` file
	`cp .env.local .env`
3. Install node packages
	`npm i`
4. Run migrations
	`npm run migration:run`
5. Start the docker compose services
	`npm run start`
6. Run serverless offline
	`npm run sls:offline`

## How to Use the API
The API has 4 different endpoints. It allows you to create an Reference, get a single or all References and their results, and delete a Reference. The app automatically schedules all the References to be reprocessed every 5 minutes. Here's how to hit the 4 endpoints:

*Note: you can import a postman collection with all the requests by importing the `SLS BoilerPlate Collection.postman_collection.json` file (located in the project root directory) into your postman workspace*
### Create a Reference
`POST /v1/reference`

**Body**:
```
{
"url": "https://www.google.com"
}
```
**cURL example**:
```
curl --location --request POST 'http://localhost:8080/v1/reference/' \
--header 'Content-Type: application/json' \
--data-raw ' {"url":"https://www.google.com"}
'
```

### Get All References
`GET /v1/references`

**cURL example**:
```
curl --location --request GET 'http://localhost:8080/v1/references'
```

### Get A Reference
`GET /v1/reference/{reference_id}`

**cURL example**:
```
curl --location --request GET 'http://localhost:8080/v1/reference/1'
```

### Delete A Reference
`Delete /v1/reference/{reference_id}`

**cURL example**:
```
curl --location --request DELETE 'http://localhost:8080/v1/reference/1'
```