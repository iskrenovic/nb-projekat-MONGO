const express = require("express");
const router = express.Router();

const {
    GetUser,
    DeleteUser,
    UpdateUser,
    GetAllUsers,
} = require('../controllers/userController');

router.get('/getUser/:ID', GetUser);
router.delete('/deleteUser/:ID', DeleteUser);
router.put('/updateUser/:ID', UpdateUser);
router.get('/getAllUsers',GetAllUsers);

module.exports = router;