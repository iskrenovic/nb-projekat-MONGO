const mongoose = require('mongoose');
const User = require('../models/userModel');
const {userToDTO} = require('../dto_handler')



const GetUser = async(req, res) => {
    const id = req.params.ID;
    if(!id || id == "null"){
        console.log("NIJE ID");
        await res.status(400).send("INVALID ID");
        return;
    }
    User.Customer.findById(id)
    .then(singleUser => {
        if(!singleUser){
            User.Admin.findById(id)
            .then(u =>{
                if(!u){
                    res.status(400).send({
                        success: false,
                        message: 'This user does not exist',
                        error: err.message,
                    });
                }
                let dto = userToDTO(u);
                dto.type = "admin";
                res.status(200).send(dto);
            })
            .catch((err) => {
                res.status(400).send({
                    message: 'This user does not exist',
                    error: err.message,
                });
                
            });
            return;
        }
        let dto = userToDTO(u);
        dto.type = "customer";
        res.status(200).send(dto);
    })
    
}

const GetAllUsers = async(req,res) =>{
    User.find()
    .select('username role email address')
    .then((allUsers) => {        
        res.status(200).send(allUsers);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
} 

const DeleteUser = async (req, res) => {
    const id = req.params.ID;
    User.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).send({
        success: true,
    }))
    .catch((err) => res.status(500).send(err));
}

const UpdateUser = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    User.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).send(updateObject);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

module.exports = {
    GetUser,
    GetAllUsers,
    DeleteUser,
    UpdateUser,
};