const Helper = require('./helper.service')

exports.logInfo = async function (headline, content = null) {
    const infoLog = {};
    ```
    prepare info log based on passed parameters
    ```
    await Helper.sendLogToQueue(infoLog);
}

exports.logError = async function (headline, error) {
    const errorLog = {};
    ```
    prepare error log based on passed parameters
    ```
    await Helper.sendLogToQueue(errorLog);
}