const express = require('express');
const router = express.Router();



router.post('/click', (req, res) => {
    console.log('Click Karan');
});


module.exports = router;