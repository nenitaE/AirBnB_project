const express = require('express');
const {Op, Sequelize} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, body, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();



//Delete a Booking
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {
    const {bookingId} = req.params;
    const {userId} = req.user;

    const booking = await Booking.findByPk(bookingId, {
        include: Spot
    })
    if (!booking) {
        return res.status(404).json({
            message:  "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (booking.startDate <= new Date()) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }
    if (booking.userId !== userId && booking.Spot.userId !== userId) {
        return res.status(403).json({
            message: "Unauthorized user",
            statusCode: 403
        })
    }
    await booking.destroy()
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


// Edit a Booking
// Update and return an existing booking.
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (booking.userId !== req.user.id) {
        return res.status(403).json({
          message: "Unauthorized user",
          statusCode: 403
        })
    }

    if (new Date(booking.endDate) < new Date()) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    const { startDate, endDate } = req.body

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate"
        }
      })
    }

    const bookingConflict = await Booking.findOne({
        where: {
          spotId: booking.spotId,
          startDate: {
            [Op.lt]: endDate
          },
          endDate: {
            [Op.gt]: startDate
          },
          id: {
            [Op.ne]: booking.id
          }
        }
    })

    if (bookingConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    booking.startDate = startDate
    booking.endDate = endDate
    await booking.save()

    const editedBooking = await Booking.findByPk(booking.id)

    res.json(editedBooking)

})




//Get all of the Current User's Bookings

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const {user} = req;
    console.log({user})
    // const user = req;
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
          {
            model: Spot,
            attributes: {
              exclude: ["description", "createdAt", "updatedAt"],
            },
          },
        ],
    });

    for ( let booking of bookings ) {
        const preview = await SpotImage.findOne({
            where: { spotId: booking.Spot.id, preview: "true" },
        });
        if (preview) {
            booking.Spot.dataValues.previewImage = preview.url;
        } else {
            booking.Spot.dataValues.previewImage = "No Preview Image";
        }
    }
    return res.json({ Bookings: bookings });
});





module.exports = router;