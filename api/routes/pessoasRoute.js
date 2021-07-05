const { Router } = require('express');
const PersonController = require('../controllers/PersonController')

const router = Router()

router.get('/Pessoas', PersonController.test)

module.exports = router