const mongoose = require('mongoose')
const user = require('../models/userModel')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { GetCustomerByUsername } = require('../controllers/loginController')

router.get('/get/username/:id',GetCustomerByUsername);
//router.get('/get/username/:id',GetBusinessByUsername);
//router.get('/get/username/:id',GetFreelancerByUsername)

router.post('/', async (req,res)=>{
    try{
        let User = await User.findOne({ username: req.body.username });

        if(!User){
            res.status(404).send('User not found!')
            return;
        }
        
        
        bcrypt.compare(req.body.password, User.password), (err, result)  => {
            if(result){
                let user = {
                    username : User.username,
                    ID : User.ID,
                    role : User.role,
                    email : User.email,
                    address : User.address
                }
                res.send(user);
                return;
            }
            res.status(401).send("Incorrect password");      
        }    
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router