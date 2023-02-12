const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const Item = require('../models/itemModel');
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
        res.status(200).send(allTransactions);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const CreateTransaction = async (req, res) => {
    
    let transaction = {
        dateBought: new Date(),
        paymentType: req.body.paymentType,
        deliveryType: req.body.deliveryType,
        userID: req.body.userID,
        itemID: req.body.itemID
    };
    Transaction.create(transaction).then(newTransaction => {        
        res.status(200).send(transactionToDTO(newTransaction));
        Item.findByIdAndUpdate(itemID,{$inc:{count:-1}});
    })
    .catch((error) => {
        res.status(500).send(error);
    });
}  

const DeleteTransaction = async (req, res) => {
    const id = req.params.ID;
    Transaction.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).send({
        success: true,
    }))
    .catch((err) => res.status(500).send(err));
}

const UpdateTransaction = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Transaction.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).send(updateObject);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetTransactionsByItemId = async (req,res) => {
    const id = req.params.itemID; 
    Transaction.find({"itemID": id})
    .select('dateBought paymentType deliveryType')
    .then((allTransactions) => {
        res.status(200).send(allTransactions);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetTransactionsByUserId = async (req,res) => {
    const id = req.params.userID; 
    Transaction.find({"userID": id})
    .select('dateBought paymentType deliveryType')
    .then((allTransactions) => {
        res.status(200).send(allTransactions);
    })
    .catch((err) => {
        res.status(500).send(err);
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