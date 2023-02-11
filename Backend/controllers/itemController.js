const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const GetItem = async(req, res) => {
    const id = req.params.ID;
    Item.findById(id)
    .then((singleItem) => {
        res.status(200).json({
            success: true,
            message: `More on ${singleItem.name}`,
            Item: singleItem,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'This item does not exist',
            error: err.message,
        });
    });
}

const GetAllItems = async(req,res) =>{
    Item.find()
    .select('name brand count price gender tags')
    .then((allItems) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all items',
            Item: allItems,
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

const CreateItem = async (req, res) => {
    const item = new Item({
        //_id: mongoose.Types.ObjectId(),
        name: req.body.name,
        brand: req.body.brand,
        count: req.body.count,
        price: req.body.price,
        gender: req.body.gender,
        tags: req.body.tags,
        categoryID: req.body.categoryID
    });
    return item
    .save()
    .then((newItem) => {
        return res.status(201).json({
            success: true,
            message: 'New item created successfully',
            Item: newItem,
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

const DeleteItem = async (req, res) => {
    const id = req.params.ID;
    Item.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
        success: true,
    }))
    .catch((err) => res.status(500).json({
        success: false,
    }));
}

const UpdateItem = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Item.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: 'Item is updated',
            updateItem: updateObject,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    });
}

const GetItemsByCategoryId = async (req,res) => {
    const id = req.params.categoryID; 
    Item.find({"categoryID": id})
    .select('name brand count price gender tags')
    .then((allItems) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all items in category',
            Item: allItems,
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

const GetItemsByGender = async (req,res) => {
    const gender = req.params.gender; 
    Item.find({"gender": gender})
    .select('name brand count price gender tags')
    .then((allItems) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all items for gender',
            Item: allItems,
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

const GetItemsByTags = async (req,res) => {
    const tags = req.params.tags; 
    Item.find({"tags": tags})
    .select('name brand count price gender tags')
    .then((allItems) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all items for tags',
            Item: allItems,
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
    GetItem,
    GetAllItems,
    CreateItem,
    DeleteItem,
    UpdateItem,
    GetItemsByCategoryId,
    GetItemsByGender,
    GetItemsByTags
};