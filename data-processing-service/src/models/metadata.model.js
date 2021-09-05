const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metadataSchema = new Schema({
    metadataId: { type: String, required: true }, // primary key
    content: { type: Object, required: true }, // metadata object, different schema for different sources
    // unique id, created_at, updated_at auto assigned by mongoDB
})

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;
