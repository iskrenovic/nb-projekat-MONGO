const  mongoose = require('mongoose');
//const Category = require('../models/categoryModel');

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
    },
    /*categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }*/
});

module.exports = mongoose.model('Item',itemSchema)