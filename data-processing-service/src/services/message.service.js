const mapService = require('./map.service');
const loggerService = require('./logger.service');

exports.handler = async function (messages) {
    messages.forEach((message) => {
        try {
            processMessage(message);
        }
        catch (e) {
            throw new Error(`$Error encountered in handling message : ${e.message}`);
        }
    });
}

async function processMessage(message) {
    try{
        const map = await mapService.getMapForSource(message.source);
        const feedback = getFeedbackFromMessage(message, map);
        const metadata = getMetadataFromMessage(message, map);
        await dbService.addFeedback(feedback);
        await dbService.addMetadata(metadata);
        return;
    }
    catch(e) {
        loggerService.log(e);
        throw new Error(`$Error encountered in processing message : ${e.message}`);
    }
}

function getFeedbackFromMessage(message, map) {
    const feedback = {};
    ```
    - create a feedback object
    - process each message and fill the feedback object
      according to the source specific mapping
    - return the feedback object
    ```
    return feedback;
}

function getMetadataFromMessage(message, map) {
    const metadata = {};
    ```
    - create a metadata object
    - process each message and fill the metadata object
      exclude fields added to feedback in source-specific mapping
    - return the metadata object
    ```
    return metadata;
}