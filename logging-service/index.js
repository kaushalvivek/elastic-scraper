const config = require('./config');
const helper = require('./src/services/helper.service');
const handler = require('./src/services/handler.service')

const consumer = helper.createConsumer(config.queueUrls.log, 10, handler.forLogs);
consumer.on('error', (err) => { throw new Error (err.message); });
consumer.start();