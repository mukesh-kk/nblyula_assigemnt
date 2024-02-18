const express= require('express');
const router = express.Router();
const healthRouter= require('./health');
const libraryRouter = require('./library');


router.use('/health',healthRouter);
router.use('/library',libraryRouter)

module.exports = router;