const  mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String,
        required: true,
    },
    brand: { 
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    }
});

module.exports = mongoose.model('Item',itemSchema)