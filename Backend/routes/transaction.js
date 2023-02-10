const express = require('express');
const router = express.Router();

const {
    CreateTransaction,
    DeleteTransaction,
    GetTransaction,
    UpdateTransaction,
    GetAllTransactions,
} = require('../controllers/transactionController');

router.get('/getTransaction/:ID', GetTransaction);
router.post('/createTransaction', CreateTransaction);
router.delete('/deleteTransaction/:ID', DeleteTransaction);
router.put('/updateTransaction/:ID', UpdateTransaction);
router.get('/getAllTransactions', GetAllTransactions);

module.exports = router;