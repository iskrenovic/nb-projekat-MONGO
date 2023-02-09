const express = require('express');
const router = express.Router();
const {
    GetCategory,
    GetAllCategories,
    CreateCategory,
    DeleteCategory,
    UpdateCategory,
} = require('../controllers/categoryController');

router.get('/getCategory/:ID', GetCategory);
router.get('/getAllCategories/', GetAllCategories);
router.post('/createCategory/', CreateCategory);
router.delete('/deleteCategory/:ID', DeleteCategory);
router.put('/updateCategory/:ID', UpdateCategory);

module.exports = router;