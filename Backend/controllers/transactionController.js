const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const {transactionToDTO} = require('../dto_handler')


const GetTransaction = async(req, res) => {
    const id = req.params.ID;
    if(!id || id == "null"){
        console.log("NIJE ID");
        await res.status(400).send("INVALID ID");
        return;
    }
    Transaction.findById(id)
    .then((singleTransaction) => {
        res.status(200).send(transactionToDTO(singleTransaction));
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: 'This transaction does not exist',
            error: err.message,
        });
    });
}

const GetAllTransactions = async(req,res) =>{
    Transaction.find()
    .select('dateBought paymentType deliveryType')
    .then((allTransactions) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all transactions',
            Transaction: allTransactions,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

const CreateTransaction = async (req, res) => {
    const transaction = new Transaction({
        //_id: mongoose.Types.ObjectId(),
        dateBought: req.body.dateBought,
        paymentType: req.body.paymentType,
        deliveryType: req.body.deliveryType,
        userID: req.body.userID,
        itemID: req.body.itemID
    });
    return transaction
    .save()
    .then((newTransaction) => {
        return res.status(201).json({
            success: true,
            message: 'New transaction created successfully',
            Transaction: newTransaction,
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });
}  

const DeleteTransaction = async (req, res) => {
    const id = req.params.ID;
    Transaction.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
        success: true,
    }))
    .catch((err) => res.status(500).json({
        success: false,
    }));
}

const UpdateTransaction = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Transaction.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: 'Transaction is updated',
            updateTransaction: updateObject,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    });
}

const GetTransactionsByItemId = async (req,res) => {
    const id = req.params.itemID; 
    Transaction.find({"itemID": id})
    .select('dateBought paymentType deliveryType')
    .then((allTransactions) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all transactions for item',
            Transaction: allTransactions,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

const GetTransactionsByUserId = async (req,res) => {
    const id = req.params.userID; 
    Transaction.find({"userID": id})
    .select('dateBought paymentType deliveryType')
    .then((allTransactions) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all transactions by user',
            Transaction: allTransactions,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

module.exports = {
    GetTransaction,
    GetAllTransactions,
    CreateTransaction,
    DeleteTransaction,
    UpdateTransaction,
    GetTransactionsByItemId,
    GetTransactionsByUserId
};