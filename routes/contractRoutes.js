const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Route to create a contract
router.post('/createContract', contractController.createContract);

module.exports = router;
