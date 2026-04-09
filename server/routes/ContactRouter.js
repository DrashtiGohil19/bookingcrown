const express = require('express');
const { submitContactForm } = require('../controller/Contact');

const router = express.Router();

router.post('/contact', submitContactForm);

module.exports = router;
