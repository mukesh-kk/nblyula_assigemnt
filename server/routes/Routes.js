const express= require('express');
const router = express.Router();
const healthRouter= require('../routes/health');
router.use('/health',healthRouter)

module.exports = router;