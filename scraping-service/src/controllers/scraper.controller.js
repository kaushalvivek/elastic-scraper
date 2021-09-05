const HandlerService = require('../services/handler.service')
const LoggerService = require('../services/logger.service')

exports.newRequest = async function (req, res) {
    try {
        LoggerService.logInfo(`New request received`, req);
        await HandlerService.handleNewRequest(req);
        LoggerService.logInfo(`Request processed successfully`, req);
        return res.status(201).json({ status: 201, message: `Request processed successfully.` });
    }
    catch (e) {
        LoggerService.logError(`Error -- processing request`, req);
        return res.status(400).json({ status: 400, message: e.message });
    }
}