const express = require('express');
const router = express.Router();
const bundleController = require('../Controller/BundleController');

// POST /api/bundles/join
router.post('/join', bundleController.joinBundle);

module.exports = router;