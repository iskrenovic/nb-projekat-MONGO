const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./config/mongo.config')

const user = require('./routes/user');
const login = require('./routes/login');
const register = require('./routes/register')
const category = require('./routes/category')
const item = require('./routes/item')
const review = require('./routes/review')
const transaction = require('./routes/transaction')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/login',login); 
app.use('/api/register',register);
app.use('/api/category',category);
app.use('/api/user',user);
app.use('/api/item',item);
app.use('/api/review',review);
app.use('/api/transaction',transaction);

app.listen(5000,() => {
    console.log('Server is listening on port 5000...');
});