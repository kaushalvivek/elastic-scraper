const DbService = require('./db.service');
const LoggerService = require('./logger.service');
const Helper = require('./helper.service');

exports.handler = async function (messages) {
    messages.forEach((message) => {
        processMessage(message);
    });
}

async function processMessage(message) {
    try {
        const map = await Helper.getMapForSource(message.source);
        const feedback = getFeedbackFromMessage(message, map);
        const metadata = getMetadataFromMessage(message, map, feedback.metadataId);
        await DbService.addFeedback(feedback);
        await DbService.addMetadata(metadata);
        LoggerService.logInfo(`message processed successfully`, message);
        return;
    }
    catch (e) {
        LoggerService.logError(`error encountered in processing message`, e);
        throw new Error(`$Error encountered in processing message : ${e.message}`);
    }
}

function getFeedbackFromMessage(message, map) {
    const feedback = {};
    ```
    - process each message and fill the feedback object
      according to the source specific mapping
    - generate a uuid metadataId
    - return the feedback object
    ```
    return feedback;
}

function getMetadataFromMessage(message, map, id) {
    const metadata = {};
    ```
    - process each message and fill the metadata object
      exclude fields added to feedback in source-specific mapping
    - assign metadataId using 'id' passed
    - return the metadata object
    ```
    return metadata;
}