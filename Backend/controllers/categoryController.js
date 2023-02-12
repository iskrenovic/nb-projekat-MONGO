const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const {categoryToDTO} = require('../dto_handler')

const GetCategory = async(req, res) => {
    const id = req.params.ID;
    if(!id || id == "null"){
        console.log("NIJE ID");
        await res.status(400).send("INVALID ID");
        return;
    }
    Category.findById(id)
    .then((singleCategory) => {
        res.status(200).send(categoryToDTO(singleCategory));
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: 'This category does not exist',
            error: err.message,
        });
    });
}

const GetAllCategories = async(req,res) =>{
    Category.find()
    .select('name')
    .then((allCategories) => {
        res.status(200).send(allCategories);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const CreateCategory = async (req, res) => {
    let category = {
        name: req.body.name,
    }
    Category.create(category).then(newCategory => {
        res.status(200).send(categoryToDTO(newCategory));
    })
    .catch((error) => {
        res.status(500).send(error);
    });
}  

const DeleteCategory = async (req, res) => {
    const id = req.params.ID;
    Category.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).send({
        success: true,
    }))
    .catch((err) => res.status(500).send(err));
}

const UpdateCategory = async (req, res) => {
    const updateObject = req.body;
    Category.findByIdAndUpdate(req.body._id, updateObject)
    .exec()
    .then(() => {
        res.status(200).send(updateObject);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

module.exports = {
    GetCategory,
    GetAllCategories,
    CreateCategory,
    DeleteCategory,
    UpdateCategory,
};