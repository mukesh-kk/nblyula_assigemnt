const express=require('express');
const healthRouter=express.Router();
const Health =require('../controllers/health');

healthRouter.get('/',Health)

module.exports = healthRouter;