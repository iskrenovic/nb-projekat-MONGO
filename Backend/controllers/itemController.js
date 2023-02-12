const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const {itemToDTO} = require('../dto_handler')

const GetItem = async(req, res) => {
    const id = req.params.ID;
    if(!id || id == "null"){
        console.log("NIJE ID");
        await res.status(400).send("INVALID ID");
        return;
    }
    Item.findById(id)
    .then((singleItem) => {
        res.status(200).send(itemToDTO(singleItem));
    })
    .catch((err) => {
        res.status(400).send({
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
        res.status(200).send(allItems);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const CreateItem = async (req, res) => {
    let item ={
        name: req.body.name,
        brand: req.body.brand,
        count: req.body.count,
        price: req.body.price,
        gender: req.body.gender,
        tags: req.body.tags,
        categoryID: req.body.categoryID
    };
    Item.create(item).then(newItem => {
        res.status(200).send(itemToDTO(newItem));
    })
    .catch((error) => {
        res.status(500).send(error);
    });
}  

const DeleteItem = async (req, res) => {
    const id = req.params.ID;
    Item.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).send({
        success: true,
    }))
    .catch((err) => res.status(500).send(err));
}

const UpdateItem = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Item.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).send(updateObject);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetItemsByCategoryId = async (req,res) => {
    const id = req.params.categoryID; 
    Item.find({"categoryID": id})
    .select('name brand count price gender tags')
    .then((allItems) => {
        res.status(200).send(allItems);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetItemsByGender = async (req,res) => {
    const gender = req.params.gender; 
    Item.find({"gender": gender})
    .select('name brand count price gender tags')
    .then((allItems) => {
        res.status(200).send(allItems);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetItemsByTags = async (req,res) => {
    const tags = req.params.tags; 
    Item.find({"tags": tags})
    .select('name brand count price gender tags')
    .then((allItems) => {
        res.status(200).send(allItems);
    })
    .catch((err) => {
        res.status(500).send(err);
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