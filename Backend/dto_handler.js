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

const categoryToDTO = (category) =>{
    return {
        name:category.name,
        _id:category._id
    }
}

const transactionToDTO = (transaction) =>{
    return {
        dateBought: transaction.dateBought,
        paymentType: transaction.paymentType,
        deliveryType: transaction.deliveryType,
        _id: transaction._id,
        userID: transaction.userID,
        itemID: transaction.itemID
    }
}

const reviewToDTO = (review) =>{
    return {

    }
}
    
//Umesto .json da bude .send
//Da nema status, success, itd.
// ne radi return za send
// create da nije new ... , nego Model.create

module.exports = {
    userToDTO,
    categoryToDTO,
    transactionToDTO,
}