const express = require('express');
const {handleUrlGenerator,handleGetAnalytics} = require('../controllers/url')

const router = express.Router();

router.post('/',handleUrlGenerator);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;