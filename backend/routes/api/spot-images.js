const express = require('express');
const {Op, Sequelize} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Delete a Spot Image

router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    
    console.log(req.params.imageId)
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const getSpotImage = await SpotImage.findByPk(imageId, {
        include: [{ model: Spot, as: 'Spot' }],
    })
    if (!getSpotImage) {
        return res.status(404).json({
            message:  "Spot Image couldn't be found",
            statusCode: 404
        })
    }
 
    if (getSpotImage.Spot.ownerId === userId) {
        await getSpotImage.destroy()
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        })

    }
    
});



module.exports = router;