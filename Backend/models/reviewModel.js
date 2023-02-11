const  mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    grade: {
        type: Number,
        required: true,
    },
    comment:{
        type: String
    },
    itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Review',reviewSchema)