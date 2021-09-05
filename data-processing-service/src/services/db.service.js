const Feedback = require('../models/feedback.model');
const Map = require('../models/map.model');
const Metadata = require('../models/metadata.model');
const loggerService = require('./logger.service');

exports.addFeedback = async function (feedback) {
    const newFeedback = new Feedback({
        source: feedback.source,
        channel: feedback.channel,
        content: feedback.content,
        metadataId: feedback.metadataId,
        name: feedback.name,
        username: feedback.username,
    })
    try {
        await newFeedback.save();
        loggerService.logInfo(`feedback saved to DB`, feedback);
    }
    catch (e) {
        loggerService.logError(`error - saving feedback to DB`, e);
        throw new Error(e.message);
    }
    return;
}

exports.addMetadata = async function (metadata, id) {
    const newMetadata = new Metadata({
        metadataId: id,
        content: metadata
    })
    try {
        await newMetadata.save();
        loggerService.logInfo(`metadata saved to DB`, feedback);
    }
    catch (e) {
        loggerService.logError(`error - saving metadata to DB`, e);
        throw new Error(e.message);
    }
    return;
}