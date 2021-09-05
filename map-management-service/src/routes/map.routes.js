const router = require('express').Router();
const MapController = require('../controllers/map.controller')

router.get('/', MapController.getMaps);
router.post('/add', MapController.addMap);
router.get('/:source', MapController.getMapBySource);
router.delete('/:source', MapController.deleteMapBySource);
router.post('/update/:source', MapController.updateMapBySource);

module.exports = router;