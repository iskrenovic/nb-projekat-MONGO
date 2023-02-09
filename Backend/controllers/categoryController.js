const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

const GetCategory = async(req, res) => {
    const id = req.params.ID;
    Category.findById(id)
    .then((singleCategory) => {
        res.status(200).json({
            success: true,
            message: `More on ${singleCategory.name}`,
            Cause: singleCategory,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'This category does not exist',
            error: err.message,
        });
    });
}

const GetAllCategories = async(req,res) =>{
    Category.find()
    .select('_id name')
    .then((allCategories) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all categories',
            Category: allCategories,
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

const CreateCategory = async (req, res) => {
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    return category
    .save()
    .then((newCategory) => {
        return res.status(201).json({
            success: true,
            message: 'New category created successfully',
            Cause: newCategory,
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

const DeleteCategory = async (req, res) => {
    const id = req.params.ID;
    Category.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
        success: true,
    }))
    .catch((err) => res.status(500).json({
        success: false,
    }));
}

const UpdateCategory = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Category.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: 'Category is updated',
            updateCause: updateObject,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    });
}

module.exports = {
    GetCategory,
    GetAllCategories,
    CreateCategory,
    DeleteCategory,
    UpdateCategory,
};