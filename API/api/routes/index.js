const express = require('express');
const router = express.Router();
const ctrlEntity = require('../controllers/entities');


//entity
router.get('/entities/', ctrlEntity.getEntities);
router.post('/entities/', ctrlEntity.createEntity);
router.put('/entities/:entity_id', ctrlEntity.changeEntity);
router.delete('/entities/:entity_id', ctrlEntity.removeEntity);

module.exports = router;
