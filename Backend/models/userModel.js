const  mongoose = require('mongoose');

const userSchema = new mongoose.Schema({    
    username: {        
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    } , 
    role:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    }    
});

const extend = (Schema, obj) => (
    new mongoose.Schema(
        Object.assign({}, Schema.obj, obj)
    )
);
  
const AdminSchema = extend(userSchema,
{
    firstname:{
        type: String
    },
    lastname:{
        type: String
    }
});

const CustomerSchema = extend(userSchema,
{
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    phone:{
        type: String
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {
    Admin,
    Customer
};