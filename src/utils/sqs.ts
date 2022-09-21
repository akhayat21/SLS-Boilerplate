import AWS from "aws-sdk";

const SQS_ACCESS_KEY_ID = process.env.PROCESS_REF_SQS_ACCESSKEYID;
const SQS_SECRET_ACCESS_KEY = process.env.PROCESS_REF_SQS_SECRETACCESSKEY;
const SQS_REGION = process.env.PROCESS_REF_SQS_REGION;
const SQS_API_VERSION = "2012-11-05";

const getSQSClient = () => {

    const sqsClient = new AWS.SQS({
    apiVersion: SQS_API_VERSION,
    region: SQS_REGION,
    accessKeyId: SQS_ACCESS_KEY_ID,
    secretAccessKey: SQS_SECRET_ACCESS_KEY,
    });

    return sqsClient;
}

export default getSQSClient;