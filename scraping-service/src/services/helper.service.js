const aws = require('aws-sdk');
const uuid = require('uuid');

const sqsConfig = {
    apiVersion: config.aws.apiVersion,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region
}
aws.config.update(sqsConfig);

const sqsClient = new aws.SQS({ apiVersion: config.aws.apiVersion })

exports.sendToQueue = async function (queueUrl, message) {
    try {
        const params = {
            QueueUrl: queueUrl,
            Entries: []
        };
        params.Entries.push({
            Id: uuid.v4(),
            MessageBody: JSON.stringify(message)
        });
        await sqsClient.sendMessage(params).promise();
        return;
    } catch (e) {
        throw new Error(e.message)
    }
}