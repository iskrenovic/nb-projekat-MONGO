const express = require('express');
const router = express.Router();

const {
    CreateTransaction,
    DeleteTransaction,
    GetTransaction,
    UpdateTransaction,
    GetAllTransactions,
    GetTransactionsByItemId,
    GetTransactionsByUserId
} = require('../controllers/transactionController');

router.get('/getTransaction/:ID', GetTransaction);
router.post('/createTransaction', CreateTransaction);
router.delete('/deleteTransaction/:ID', DeleteTransaction);
router.put('/updateTransaction/:ID', UpdateTransaction);
router.get('/getAllTransactions', GetAllTransactions);
router.get('/getTransactionsByItemId/:itemID', GetTransactionsByItemId);
router.get('/getTransactionsByUserId/:userID', GetTransactionsByUserId);

module.exports = router;