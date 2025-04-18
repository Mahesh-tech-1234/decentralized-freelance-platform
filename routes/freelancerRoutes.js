const express = require('express');
const router = express.Router();

// Ensure each route has a valid callback
router.get('/freelancer', (req, res) => {
    res.send('Freelancer route');
});

module.exports = router;
