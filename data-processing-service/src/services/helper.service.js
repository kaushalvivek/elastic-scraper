```
Information about this file
```

const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');

exports.createConsumer = function (queueUrl, batchSize, handler) {
    return Consumer.create({
        queueUrl: queueUrl,
        batchSize: batchSize,
        handleMessageBatch: handler,
        sqs: new AWS.SQS({
            httpOptions: {
                agent: new https.Agent({
                    keepAlive: true
                })
            }
        })
    })
};