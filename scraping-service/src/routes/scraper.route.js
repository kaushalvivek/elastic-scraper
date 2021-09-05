const Router = require('express').Router();
const ScraperController = require('../controllers/scraper.controller')

Router.post('/', ScraperController.newRequest);

module.exports = Router;