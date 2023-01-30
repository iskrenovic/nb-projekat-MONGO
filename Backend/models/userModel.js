const  neo4j  = require('../config/neo4j_config');

neo4j.model('User', {
    username: {        
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    } , 
    role:{
        type: 'string'
    },
    email:{
        type: 'string'
    },
    contact:{
        type: 'string'
    },   
    ID: {
        primary: true,
        unique: true,
        type: 'uuid'
    }
    
});