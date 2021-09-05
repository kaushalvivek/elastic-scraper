const MapService = require('../services/map.service')

exports.getMaps = async function (req, res) {
    try {
        const maps = await MapService.getMaps({});
        return res.status(200).json({ status: 200, data: maps, message: `Successfully fetched maps.` });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addMap = async function (req, res) {
    try {
        await MapService.addMap(req);
        return res.status(201).json({ status: 201, message: `Map added successfully.` });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMapBySource = async function (req, res) {
    try {
        const map = await MapService.getMapBySource(req.params.id);
        return map ?
            res.status(200).json({ status: 200, data: map, message: `Map fetched successfully.` })
            : res.status(404).json({ status: 404, message: `Map not found.` });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteMapBySource = async function (req, res) {
    try {
        const response = await MapService.deleteMapBySource(req.params.id);

        return response ?
            res.status(200).json({ status: 200, message: `Map deleted successfully.` })
            : res.status(404).json({ status: 404, message: `Map not found.` });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateMapBySource = async function (req, res) {
    try {
        const response = await MapService.updateMapBySource(req);
        return response? 
         res.status(201).json({ status: 201, message: `Map updated successfully.` })
         : res.status(404).json({ status: 404, message: `Map not found.` });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}