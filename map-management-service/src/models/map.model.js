const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mapSchema = new Schema({
    source: { type: String, required: true }, // primary key
    softMap: { type: Object}, // a series of key-value pairs which map to response fields
    /* eg. 
        {
            channel: response.info.appName
            content: response.body.review
            name: response.body.userInfo.name
            ...
            etc.
        }
    */
    hardMap: { type: Object } // hard-coded maps for each source
        /* eg. 
        {
            source: play_store
            ...
            etc.
        }
    */
    // unique id, created_at, updated_at auto assigned by mongoDB
})

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;