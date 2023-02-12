const mongoose = require('mongoose')
const user = require('../models/userModel')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { GetCustomerByUsername } = require('../controllers/loginController')
const {userToDTO} = require('../dto_handler');

router.get('/get/username/:id',GetCustomerByUsername);
//router.get('/get/username/:id',GetBusinessByUsername);
//router.get('/get/username/:id',GetFreelancerByUsername)

router.post('/', async (req,res)=>{
    try{
        let User = await user.Customer.findOne({ username: req.body.username });
        let type = "customer"
        if(!User){
            User = await user.Admin.findOne({username:req.body.username});
            if(!User){
                res.status(404).send('User not found!')
                return;
            }
            type = "admin";
        }       
        console.log(User);
        bcrypt.compare(req.body.password, User.password, (err, result)  => {
            if(result){
                User.type = type;
                res.status(200).send(userToDTO(User));
                return;
            }
            res.status(401).send("Incorrect password");      
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router