const  mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    dateBought: {
        type: Date,
        required: true                
    },
    paymentType: {
        type: String,
        required: true
    },
    deliveryType:{
        type: String,
        required:true
    },
    /*userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    itemID: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Item"
    }*/    
});

module.exports = mongoose.model('Transaction',transactionSchema)
