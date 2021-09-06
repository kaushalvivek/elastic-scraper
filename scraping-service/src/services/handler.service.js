const Scraper = require('./scraper.service');
const Helper = require('./helper.service');
const Config = require('../config');

exports.handleNewRequest = async function (req) {
    try {
        const messages = blackBoxedScraper[req.body.source](req);
        messages.forEach((message) => {
            Helper.sendToQueue(Config.queueUrls.data, message);
        })

    }
    catch (e) {
        throw new Error(e.message);
    }
};

const blackBoxedScraper = {
    playStore: Scraper.fromPlayStore,
    discourse: Scraper.fromDiscourse,
    twitter: Scraper.fromTwitter,
    // add other sources here
};

