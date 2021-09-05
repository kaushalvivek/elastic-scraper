```
Information about this file 
```

const config = require('./config');
const helper = require('./src/services/helper.service');
const handler = require('./src/services/handler.service');

const consumer = helper.createConsumer(config.queueUrls.data, 10, handler.forData);
consumer.on('error', (err) => { handler.forLog(err); });
consumer.start();