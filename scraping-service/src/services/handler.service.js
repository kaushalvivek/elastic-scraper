const Scraper = require('./scraper.service');

exports.handleNewRequest = async function (req) {
    try {
        blackBoxedScraper[req.body.source](req);
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

