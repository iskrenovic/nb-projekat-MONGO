const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {userToDTO} = require('../dto_handler')

const CreateUser = async (req,res) => {  

    if(await usernameTaken(req.body.username)){
        res.status(409).send("USERNAME TAKEN");
        return;
    }
    //Sve šifre obavezo heširamo kako se ne bi čuvale u svom normalnom stanju i ne bi bile sigurnosni rizik
    let userType = User.Admin;
    let obj = {
        username: req.body.username,
        role: req.body.role,
        email: req.body.email,
        address: req.body.address,
    }
    console.log(req.body.role);
    console.log(req.body);
    if(req.body.role == "customer"){
        userType = User.Customer;
        obj.firstname = req.body.firstname;
        obj.lastname = req.body.lastname;
        obj.phone = req.body.phone;
    }
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        obj.password = hash;
        userType.create(obj).then(u => {
            res.status(200).send(userToDTO(u));
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    }).catch(err => res.status(500).send(err))
}
//Proveravamo da nije neki username zauzet za svaki slučaj
const usernameTaken = async (username, email) => {
    let users = await User.Admin.find({username:username, email:email});
    if(users.length>0)return true;
    users = await User.Customer.find({username:username, email:email});
    return users.length>0;
}

module.exports = {
    CreateUser,
};