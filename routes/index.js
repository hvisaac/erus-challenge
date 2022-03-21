const { Router } = require('express');
const router = Router();
const { helloworld, hasMutation, getStats, getList } = require('../controllers/dna');

router.get('/', helloworld); 
router.post('/mutation/', hasMutation);
router.get('/stats/', getStats);
router.get('/list', getList);

module.exports = router;