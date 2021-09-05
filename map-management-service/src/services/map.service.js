const Map = require('../models/map.model');

exports.getMaps = async function (query) {
    try {
        const maps = await Map.find(query);
        return maps;
    }
    catch (e) {
        throw Error(e.message);
    }
}

exports.addMap = async function (req) {
    const newMap = new Map({
        source: req.body.source,
        softMap: req.body.softMap,
        hardMap: req.body.hardMap
    });
    try {
        await newMap.save();
    } catch (e) {
        throw Error(e.message);
    }
}

exports.getMapBySource = async function (req) {
    try {
        return Map.find({ source: req.params.source });
    }
    catch (e) {
        throw Error(e.message);
    }
}

exports.deleteMapBySource = async function (source) {
    try {
        return Map.findAndDelete({ source: source });
    }
    catch (e) {
        throw Error(e.message);
    }
}

exports.updateMapBySource = async function (req) {
    try {
        const map = await Map.findById(req.params.source);
        if (map) {
            map.source = req.body.source;
            map.softMap = req.body.softMap;
            map.hardMap = req.body.hardMap;
            await map.save();
        }
        return map;
    }
    catch (e) {
        throw Error(e.message);
    }
}