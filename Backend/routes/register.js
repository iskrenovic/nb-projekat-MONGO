const express = require('express');
const router = express.Router();

const { CreateOwner,CreateCustomer } = require('../controllers/registerController');

router.post('/createOwner',CreateOwner);     
router.post('/createCustomer',CreateCustomer);

module.exports = router;