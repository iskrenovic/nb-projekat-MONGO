const express = require('express');
const router = express.Router();

const { CreateUser } = require('../controllers/registerController');

router.post('/',CreateUser);  

module.exports = router;