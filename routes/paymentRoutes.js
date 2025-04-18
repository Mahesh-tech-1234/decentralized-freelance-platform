const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

router.post('/register', freelancerController.registerFreelancer);
router.get('/:freelancerId', freelancerController.getFreelancer);
router.put('/update/:freelancerId', freelancerController.updateFreelancer);

module.exports = router;
