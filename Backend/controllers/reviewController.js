const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
const {reviewToDTO} = require('../dto_handler')

const GetReview = async(req, res) => {
    const id = req.params.ID;
    if(!id || id == "null"){
        console.log("NIJE ID");
        await res.status(400).send("INVALID ID");
        return;
    }
    Review.findById(id)
    .then((singleReview) => {
        res.status(200).send(reviewToDTO(singleReview));
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: 'This review does not exist',
            error: err.message,
        });
    });
}

const GetAllReviews = async(req,res) =>{
    Review.find()
    .select('grade comment')
    .then((allReviews) => {
        res.status(200).send(allReviews);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const CreateReview = async (req, res) => {
    let review = {
        grade: req.body.grade,
        comment: req.body.comment,
        itemID: req.body.itemID,
        userID: req.body.userID
    };
    Review.create(review).then(newReview => {
        res.status(200).send(reviewToDTO(newReview));
    })
    .catch((error) => {
        res.status(500).send(error);
    });
}  

const DeleteReview = async (req, res) => {
    const id = req.params.ID;
    Review.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).send({
        success: true,
    }))
    .catch((err) => res.status(500).send(err));
}

const UpdateReview = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Review.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).send(updateObject);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetReviewsByUserId = async (req,res) => {
    const id = req.params.userID; 
    Review.find({"userID": id})
    .select('grade comment')
    .then((allReviews) => {
        res.status(200).send(allReviews);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

const GetReviewsByItemId = async (req,res) => {
    const id = req.params.itemID; 
    Review.find({"itemID": id})
    .select('grade comment')
    .then((allReviews) => {
        return res.status(200).send(allReviews);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
}

module.exports = {
    GetReview,
    GetAllReviews,
    CreateReview,
    DeleteReview,
    UpdateReview,
    GetReviewsByUserId,
    GetReviewsByItemId
};