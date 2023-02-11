const  mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    grade: {
        type: Number,
        required: true,
    },
    comment:{
        type: String
    },
    /*itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CateUsergory"
    }*/
});

module.exports = mongoose.model('Review',reviewSchema)