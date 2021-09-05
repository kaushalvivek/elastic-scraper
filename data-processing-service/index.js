const config = require('./src/config');
const helper = require('./src/services/helper.service');
const messageService = require('./src/services/message.service');

const consumer = helper.createConsumer(config.queueUrls.data, 10, messageService.handler);
consumer.on('error', (err) => { loggerService.logError(`consumer encountered an error`, err); });
consumer.start();