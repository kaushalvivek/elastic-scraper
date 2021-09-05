const helper = require('./helper.service')

exports.logInfo = async function (headline, content = null) {
    const infoLog = {};
    ```
    prepare info log based on passed parameters
    ```
    await helper.sendLogToQueue(infoLog);
}

exports.logError = async function (headline, error) {
    const errorLog = {};
    ```
    prepare error log based on passed parameters
    ```
    await helper.sendLogToQueue(errorLog);
}