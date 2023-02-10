const  mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    grade: {
        type: Number,
        required: true,
    },
    comment:{
        type: String
    }
});

module.exports = mongoose.model('Review',reviewSchema)