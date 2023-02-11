const express = require('express');
const router = express.Router();

const {
    CreateReview,
    DeleteReview,
    GetReview,
    UpdateReview,
    GetAllReviews,
    GetReviewsByUserId,
    GetReviewsByItemId
} = require('../controllers/reviewController');

router.get('/getReview/:ID', GetReview);
router.post('/createReview', CreateReview);
router.delete('/deleteReview/:ID', DeleteReview);
router.put('/updateReview/:ID', UpdateReview);
router.get('/getAllReviews', GetAllReviews);
router.get('/getReviewsByUserId/:userID', GetReviewsByUserId);
router.get('/getReviewsByItemId/:itemID', GetReviewsByItemId);

module.exports = router;