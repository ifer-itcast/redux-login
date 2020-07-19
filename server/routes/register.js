const express = require('express');
const router = express.Router();
const checkData = require('../middleware/checkData');
const { registerSchema } = require('../schema/register');

router.post('/register', checkData(registerSchema), require('../routesHandler/register'));

module.exports = router;