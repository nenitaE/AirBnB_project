const express = require('express');
const {Op, Sequelize} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Delete a Review Image

router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const getRevImage = await ReviewImage.findByPk(imageId)
    if (!getRevImage) {
        return res.status(404).json({
            message:  "Review Image couldn't be found",
            statusCode: 404
        })
    }
    
    const getReview = await Review.findByPk(getRevImage.reviewId)
    
    if (getReview.dataValues.userId === userId) {
        await getRevImage.destroy()
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.status(403).json({
            message: 'Unauthorized user',
            statusCode: 403,
        })

    }
    
});
module.exports = router;