const mongoose = require('mongoose');
const Review = require('../models/reviewModel');

const GetReview = async(req, res) => {
    const id = req.params.ID;
    Review.findById(id)
    .then((singleReview) => {
        res.status(200).json({
            success: true,
            message: `Successful`,
            Review: singleReview,
        });
    })
    .catch((err) => {
        res.status(500).json({
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
        return res.status(200).json({
            success: true,
            message: 'A list of all reviews',
            Review: allReviews,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

const CreateReview = async (req, res) => {
    const review = new Review({
        //_id: mongoose.Types.ObjectId(),
        grade: req.body.grade,
        comment: req.body.comment,
    });
    return review
    .save()
    .then((newReview) => {
        return res.status(201).json({
            success: true,
            message: 'New review created successfully',
            Review: newReview,
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    });
}  

const DeleteReview = async (req, res) => {
    const id = req.params.ID;
    Review.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
        success: true,
    }))
    .catch((err) => res.status(500).json({
        success: false,
    }));
}

const UpdateReview = async (req, res) => {
    const id = req.params.ID;
    const updateObject = req.body;
    Review.findByIdAndUpdate(id, updateObject)
    .exec()
    .then(() => {
        res.status(200).json({
            success: true,
            message: 'Review is updated',
            updateReview: updateObject,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
        });
    });
}

module.exports = {
    GetReview,
    GetAllReviews,
    CreateReview,
    DeleteReview,
    UpdateReview,
};