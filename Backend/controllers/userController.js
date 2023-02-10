const mongoose = require('mongoose');
const User = require('../models/userModel');

const GetUser = async(req, res) => {
    const id = req.params.ID;
    User.findById(id)
    .then((singleUser) => {
        res.status(200).json({
            success: true,
            message: `Successful`,
            User: singleUser,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'This user does not exist',
            error: err.message,
        });
    });
}

const GetAllUsers = async(req,res) =>{
    User.find()
    .select('username role email address')
    .then((allUsers) => {
        return res.status(200).json({
            success: true,
            message: 'A list of all users',
            User: allUsers,
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

/*const CreateUser = async (req, res) => {
    const user = new User({
        //_id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        address: req.body.address,
    });
    return user
    .save()
    .then((newUser) => {
        return res.status(201).json({
            success: true,
            message: 'New user created successfully',
            User: newUser,
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });
} */ 

const DeleteUser = async (req, res) => {
    const id = req.params.ID;
    User.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
        success: true,
    }))
    .catch((err) => res.status(500).json({
        success: false,
    }));
}

const UpdateUser = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    User.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: 'User is updated',
            updateUser: updateObject,
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
    GetUser,
    GetAllUsers,
    DeleteUser,
    UpdateUser,
};