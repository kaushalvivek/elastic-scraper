const Consumer = require('sqs-consumer');
const aws = require('aws-sdk');

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