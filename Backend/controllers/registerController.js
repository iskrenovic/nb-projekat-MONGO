const mongoose = require('mongoose');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const CreateOwner = async (req,res) => {  

    /*let ownerExists=GetOwnerByUsername(req.body.username)
    let businessExists=GetBusinessByUsername(req.body.username)
    let freelancerExists=GetFreelancerByUsername(req.body.username)
    if(ownerExists==null)*/
    if(await usernameTaken(req.body.username)){
        res.status(409).send("USERNAME TAKEN");
        return;
    }
    //Sve šifre obavezo heširamo kako se ne bi čuvale u svom normalnom stanju i ne bi bile sigurnosni rizik
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        const owner = new User({
            username: req.body.username,
            password: hash,
            role: req.body.role,
            email: req.body.email,
            address: req.body.address,
            firstname: req.body.firstname
        });
        return owner
        .save()
        .then((newOwner) => {
            return res.status(201).json({
                success: true,
                message: 'New owner created successfully',
                Owner: newOwner,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
    }).catch(err => res.status(500).send(err))
}

const CreateCustomer = async (req,res) => {  
    if(await usernameTaken(req.body.username)){
        res.status(409).send("USERNAME TAKEN");
        return;
    }
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        const customer = new User({
            //_id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            email: req.body.email,
            address: req.body.address,
            firstname: req.body.firstname,
            phone: req.body.phone,
        });
        return customer
        .save()
        .then((newCustomer) => {
            return res.status(201).json({
                success: true,
                message: 'New customer created successfully',
                Customer: newCustomer,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
    }).catch(err => res.status(500).send(err))
}
//Proveravamo da nije neki username zauzet za svaki slučaj
const usernameTaken = async (username, email) => {
    let users = await User.find({username:username, email:email});
    return users.length>0;
}

module.exports = {
    CreateOwner,
    CreateCustomer,
};