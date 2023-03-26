const express = require('express');
const {Sequelize, Op} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, body, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//validations
const validateReviewImage = [
    body('url')
        .exists()
        .withMessage("URL is required")
        .isURL(),
    handleValidationErrors
  ]

const validateReview = [
    body('review')
        .exists()
        .isLength({ min: 4 })
        .withMessage('Review text is required'),
    body('stars')
        .exists()
        .isInt({min:1, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]






//   Edit a Review
//   Update and return an existing review.
router.put('/:reviewId', restoreUser, requireAuth, validateReview, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId
        }
    })

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    
    if (review.userId === userId){
        const {review:reviewData, stars} = req.body;
        review.review = reviewData;
        review.stars = stars;

        await review.save();

        return res.json(review);
    } else {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        })
    }
})

// Add an Image to a Review based on the Review's id
// Create and return a new image for a review specified by id.

router.post('/:reviewId/images', restoreUser, requireAuth, validateReviewImage, async (req, res) => {
    const {user} = req;
    const reviewId = req.params.reviewId;
    const imageInfo = req.body;

    const getReview = await Review.findByPk(reviewId);
    
    if (!getReview) {
        return res.status(400).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    const reviewCount = await ReviewImage.count({
        where: {reviewId}
    })

    if (reviewCount >= 10) {
        return res.status(403).json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403,
        })
    }
    
    if(getReview.userId === user.id){
        const createReviewImage = await ReviewImage.create({
            reviewId: reviewId,
            ...imageInfo
        })

        const {id, url} = createReviewImage;
        return res.status(200).json({id, url})
    } else {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        })
    }
});




// Delete a Review
// Delete an existing review.
router.delete('/:reviewId', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const getReview = await Review.findByPk(reviewId);

    if (!getReview) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if (getReview.userId === userId) {
        await getReview.destroy()

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        })
    }
})


// Get all Reviews of the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const {user} = req;
    console.log({user})
    // const user = req;
    const reviews = await Review.findAll({
        
        where: { userId: user.id },
        include: [
            {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
            },
            {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
            [Sequelize.fn('COALESCE', Sequelize.col('url'), 'default_image_url'),'previewImage']]
            },
            {
            model: ReviewImage,
            attributes: ['id', 'url']
            }
        ]
        })
        res.status(200).json({ Reviews: reviews })
});













module.exports = router;