const userToDTO = (user) =>{
    return {
        firstname: user.firstname,
        lastname:user.lastname,
        username: user.username,
        _id: user._id,
        role:user.role,
        email:user.email,
        address:user.address
    }
}
    
//Umesto .json da bude .send
//Da nema status, success, itd.
// ne radi return za send
// create da nije new ... , nego Model.create

module.exports = {
    userToDTO
}