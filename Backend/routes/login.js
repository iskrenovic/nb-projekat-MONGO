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
    //let User = await neo4j.first('User', {username : req.body.username})
    let User = await User.findOne({ username: req.body.username });

    if(User == false){
        res.status(404).send('User not found!')
        return;
    }
    
    
    bcrypt.compare(req.body.password, User._properties.get("password"), (err, result)  => {
        if(result){
            let user = {
                username : User._properties.get("username"),
                ID : User._properties.get("ID"),
                role : User._properties.get("role"),
                email : User._properties.get("email"),
                address : User._properties.get("address")
            }
            res.send(user);
            return;
        }else{
            res.status(401).send({
                error: "Incorrect password"})
        }
    })  
   }catch(e){
        res.status(500).send(e)
    }  
})

module.exports = router