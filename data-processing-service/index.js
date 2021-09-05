```
Information about this file 
```

const config = require('./config');
const helper = require('./src/services/helper.service');
const messageService = require('./src/services/message.service');

const consumer = helper.createConsumer(config.queueUrls.data, 10, messageService.handler);
consumer.on('error', (err) => { loggerService.log(err); });
consumer.start();