const express = require('express');
const router = express.Router();

const {
    CreateItem,
    DeleteItem,
    GetItem,
    UpdateItem,
    GetAllItems
} = require('../controllers/itemController');

router.get('/getItem/:ID', GetItem);
router.post('/createItem', CreateItem);
router.delete('/deleteItem/:ID', DeleteItem);
router.put('/updateItem/:ID', UpdateItem);
router.get('/getAllItems', GetAllItems);

module.exports = router;