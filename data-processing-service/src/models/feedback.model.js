const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    source: { type: String, required: true }, // eg. play-store, discourse, twitter etc.
    channel: { type: String }, // eg. name of app, slack channel etc.
    content: { type: String, required: true }, // main message
    metadataId: {type: String}, // foreign key to connect with source-specific metadata
    name : {type: String}, // optional
    username : {type: String}, // optional
    // unique id, created_at, updated_at auto assigned by mongoDB
    // possible extension --> tracking a user's feedback across different platforms
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
