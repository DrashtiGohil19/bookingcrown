const express = require('express');
const { createPlan } = require('../controller/Plan');
const { VerifyToken } = require('../middlewere/VerifyToken');
const router = express.Router();

router.post("/createPlan/:id", VerifyToken, createPlan)

module.exports = router;
