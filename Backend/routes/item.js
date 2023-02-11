const express = require('express');
const router = express.Router();

const {
    CreateItem,
    DeleteItem,
    GetItem,
    UpdateItem,
    GetAllItems,
    GetItemsByCategoryId,
    GetItemsByGender,
    GetItemsByTags
} = require('../controllers/itemController');

router.get('/getItem/:ID', GetItem);
router.post('/createItem', CreateItem);
router.delete('/deleteItem/:ID', DeleteItem);
router.put('/updateItem/:ID', UpdateItem);
router.get('/getAllItems', GetAllItems);
router.get('/getItemsByCategoryId/:categoryID', GetItemsByCategoryId);
router.get('/getItemsByGender/:gender', GetItemsByGender);
router.get('/getItemsByTags/:tags', GetItemsByTags);

module.exports = router;