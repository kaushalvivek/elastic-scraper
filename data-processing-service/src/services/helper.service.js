const Consumer = require('sqs-consumer');
const aws = require('aws-sdk');
const loggerService = require('./logger.service');
const config = require('../config')

const sqsConfig = {
    apiVersion: config.aws.apiVersion,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region
}
aws.config.update(sqsConfig);

const sqsClient = new aws.SQS({ apiVersion: config.aws.apiVersion })

exports.createConsumer = function (queueUrl, batchSize, handler) {
    loggerService.logInfo(`creating new consumer for ${queueUrl}`);
    return Consumer.create({
        queueUrl: queueUrl,
        batchSize: batchSize,
        handleMessageBatch: handler,
        sqs: new aws.SQS({
            httpOptions: {
                agent: new https.Agent({
                    keepAlive: true
                })
            }
        })
    })
};

exports.sendLogToQueue = async function (log) {
    try {
        const params = {
            QueueUrl: queueUrl,
            Entries: []
        };
        params.Entries.push({
            Id: uuid.v4(),
            MessageBody: JSON.stringify(log)
        });
        await sqsClient.sendMessage(params).promise();
        return;
    } catch (e) {
        throw new Error(e.message)
    }
}