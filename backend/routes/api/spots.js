const express = require('express');
const {Sequelize, Op} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, body, query, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateFilters = [
    query('page')
        .customSanitizer(val => val || 1)
        .isInt({ min: 1, max: 10 })
        .withMessage("Page must be greater than or equal to 1"),
    query('size')
        .customSanitizer(val => val || 20)
        .isInt({ min: 1, max: 20 })
        .withMessage("Size must be greater than or equal to 1"),
    query('minLat')
        .isFloat({ min: -90, max: 90 })
        .withMessage("Minimum latitude is invalid")
        .optional(),
    query('maxLat')
        .isFloat({ min: -90, max: 90 })
        .withMessage("Maximum latitude is invalid")
        .optional(),   
    query('minLng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Minimum longitude is invalid")
        .optional(),
    query('maxLng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Maximum longitude is invalid")
        .optional(),
    query('minPrice')
        .isInt({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0")
        .optional(),
    query('maxPrice')
        .isInt({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0")
        .optional(),
    handleValidationErrors
];

const validateNewSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true }),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({ min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ]

//Edit a spot
//Updates and returns an existing spot.

router.put('/:spotId', restoreUser, requireAuth, validateNewSpot, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const userId = req.user.id

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      })
    }

    if (spot.ownerId !== userId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        })
    }

    const updatedSpot = await spot.update(req.body)

    return res.status(200).json(updatedSpot)
});

// Delete a spot
// Deletes an existing spot.
router.delete('/:spotId',restoreUser, requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const spot = await Spot.findOne({ where: { id: spotId, ownerId: userId } })

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }
    
    if(spot.ownerId !== userId){
      return res.status(401).json({message: 'Unauthorized user'})
  }

    await spot.destroy()

    return res.status(200).json({ message: "Successfully deleted", statusCode: 200})
});



router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    try {
        const spotId = req.params.spotId
        const { startDate, endDate } = req.body
        const spot = await Spot.findByPk(spotId)
        
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        } 
       
        if (spot.ownerId === req.user.id) {
            return res.status(403).json({
                message: 'You cannot book your own spot',
                statusCode: 403
            })
        }
        if (endDate <= startDate) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate:"endDate cannot be on or before startDate"
                }
            })
        }
        const currBookings = await Booking.findAll({
            attributes: [[Sequelize.fn('date', Sequelize.col('startDate')), 'startDate'],
            [Sequelize.fn('date', Sequelize.col('endDate')), 'endDate']],
            where: {
                spotId,
                [Op.or]: [
                    { startDate: { [Op.between]: [startDate, endDate] } },
                    { endDate: { [Op.between]: [startDate, endDate] } },
                    { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: endDate } }
                ]
            }
        })
        if (currBookings.length) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate:"Start date conflicts with an existing booking",
                    endDate:"End date conflicts with an existing booking"
                }
            })
        }
        const booking = await Booking.create({
  
            userId: req.user.id,
            spotId: spotId,
            startDate: new Date(req.body.startDate).toISOString().slice(0, 10),
            endDate: new Date(req.body.endDate).toISOString().slice(0, 10),
        })
        res.json(booking)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal server error',
            statusCode: 500
        })
    }
  })



// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const newImage = req.body
    const {user} = req
  
  
    try {
        newImage.spotId = spotId
        const spot = await Spot.findOne({ 
            where: { id: spotId, ownerId: user.id } 
        })
  
        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
  
        if(spot.ownerId !== user.id ){
            return res.status(403).json({
                message: 'Forbidden',
                statusCode: 403,
            })
      }
  
        const addImage = await SpotImage.create(newImage)
        const {id,url,preview} = addImage
       
        return res.json({
            id:id,
            url:url,
            preview:preview
        })
        
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        statusCode: 500,
        errors: error,
      })
    }
 })

  
// Create a Review for a Spot based on the Spot's id
// Create and return a new review for a spot specified by id.

router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params
    const { review, stars } = req.body
    const userId = req.user.id
  
    const spot = await Spot.findByPk(spotId)
      
    if (!spot) {
        return res.status(404).json({ 
            message: "Spot couldn't be found", 
            statusCode: 404
        })
    }
  
    const existingReview = await Review.findOne({
        where: { 
            userId, 
            spotId 
        }
    })
    
    if (existingReview) {
        return res.status(403).json({
            message: 'User already has a review for this spot',
            statusCode: 403
        })
      }
  
    const newReview = await Review.create({ review, stars, userId, spotId })
  
    return res.status(201).json(newReview)
  
  })




// Create a Spot
// Creates and returns a new spot.
router.post('/', requireAuth, validateNewSpot, async (req, res, next) => {
    //console.log(req.user.id)
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;
    
    const ownerId = await User.findByPk(req.user.id);
    const newSpot = await ownerId.createSpot({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    
    return res.status(201).json(newSpot)
    

})
// Get all Spots owned by the Current User
// Returns all the spots owned (created) by the current user.
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    
 
    const userId = req.user.dataValues.id;
    const userSpots = await Spot.findAll({
        
            where: { ownerId: userId},
            include: [
                { model: Review, attributes: ['stars'] },
                { model: SpotImage, attributes: ['url'] }
            ]
    });
    for ( let spot of userSpots ) {
        
        if (!spot.dataValues.SpotImages.length) {
                message = "This Spot does not have images.";
                spot.dataValues.previewImage = message 
                delete spot.dataValues.SpotImages;   
        } else {
            for ( let image of spot.SpotImages ) {   
            spot.dataValues.previewImage = image.url;
        }
        delete spot.dataValues.SpotImages;
        };

        let sum = 0;
        for ( let review of spot.Reviews ) {
            sum += review.dataValues.stars;
        };
        average = sum/spot.Reviews.length;
        spot.dataValues.avgRating = average;
        if ( !spot.dataValues.avgRating ) {
            spot.dataValues.avgRating = "This spot has not been rated."
        }
        delete spot.dataValues.Reviews;
    }
    return res.status(200).json({"Spots":userSpots})
        
});

//Get details of a Spot from an id
//Returns the details of a spot specified by its id.
router.get('/:spotId', async (req, res) => {
  
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId,{
        include: [
            {model: SpotImage, attributes: ["id", "url", "preview"]},
            {model: User, attributes:["id", "firstName", "lastName"], as: "Owner"},
            {model: Review}
        ]

    })
    if (!spot) {
        return res.status(404).json({
          message: "Spot couldn't be found",
          statusCode: 404
        })
    }
    spot.dataValues.numReviews = spot.dataValues.Reviews.length;
    
    if (spot.dataValues.Reviews.length) {
        let sum = 0;
        for (let i =0; i < spot.dataValues.Reviews.length; i++) {
            sum += spot.dataValues.Reviews[i].dataValues.stars
        }
        spot.dataValues.avgStarRating = sum / spot.dataValues.Reviews.length;
    } else {
        spot.dataValues.avgStarRating = "This spot has not been rated";
    } 
    if (!spot.dataValues.SpotImages.length) {
        message = "This Spot does not have images.";
        spot.dataValues.SpotImages = message 
        // delete spot.dataValues.SpotImages;   
    } 
    delete spot.dataValues.Reviews;
    return res.status(200).json({spot})
});


// Get all Reviews by a Spot's id
// Returns all the reviews that belong to a spot specified by id.

router.get('/:spotId/reviews', async (req, res) => {
    try {
      const spotId = req.params.spotId
      const spot = await Spot.findByPk(spotId)
      if (!spot) {
        return res.status(404).json({
          message: "Spot couldn't be found",
          statusCode: 404
        })
      }
  
      const reviews = await Review.findAll({
        where: { spotId },
        include: [
              {model: User,attributes: ['id', 'firstName', 'lastName']},
              {model: ReviewImage,attributes: ['id', 'url']},
            ]
      });
      return res.status(200).json({ Reviews: reviews })
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        statusCode: 500
      })
    }
  })


//   Get all Bookings for a Spot based on the Spot's id
//   Return all the bookings for a spot specified by id.

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
  
    const getSpot = await Spot.findByPk(spotId)
  
    if (!getSpot || getSpot === []){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (getSpot.ownerId !== userId) {
        const userBookings = await Booking.findAll({
            where: {
            userId: userId,
            spotId: getSpot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        
        const mappedBookings = userBookings.map((booking) => {
            return {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
        })        
        return res.status(200).json({
            Bookings: mappedBookings
        })
    } else {
        const ownerBookings = await Booking.findAll({
            where: {
                spotId: getSpot.id
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        });
        
        const mappedBookings = ownerBookings.map((booking) => {
            return {
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
                user: {
                    id: booking.User.id,
                    firstName: booking.User.firstName,
                    lastName: booking.User.lastName
                }
            }
        })
        
        return res.status(200).json({
            Bookings: mappedBookings
        })
    }
})
 

//Get all spots; add an average stars rating and
// url to spotImage
router.get('/', validateFilters, async (req, res, next) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query
    let errors = {};

    if ( !page || page > 10 ) {
        page = 1;
    } 
    if ( page < 1 || isNaN( page ) ) {
        errors.page = "Page must be greater than or equal to 1"
    }
    if ( !size || size > 20 ) {
        size = 20;
    } 
    if ( size < 1 || isNaN( size ) ) {
        errors.size = "Size must be greater than or equal to 1";
    }
    if ( !minLat ) {
        minLat = -90;
    } 
    if ( minLat < -90 || minLat > 90 || isNaN(minLat) ) {
        errors.minLat = "Minimum latitude is invalid";
    }
    if ( !maxLat ) {
        maxLat = 90;
    }  
    if (maxLat < -90 || maxLat > 90 || isNaN(maxLat)) {
        errors.maxLat = "Minimum latitude is invalid";
    }
    if (!minLng) {
        minLng = -180;
    }   
    if (minLng < -180 || minLng > 180 || isNaN(minLng)) {
        errors.minLng = "Minimum latitude is invalid";
    }
    if (!maxLng) {
        maxLng = 180;
    } 
    if ( maxLng < -180 || maxLng > 180 || isNaN( maxLng ) ) {
        errors.maxLng = "Minimum latitude is invalid";
    }
    if (!minPrice) {
        minPrice = 1;
    } 
    if (minPrice < 0 || isNaN(size)) {
        errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
    if ( !maxPrice ) { 
        maxPrice = 1000000;
    } 
    if (maxPrice < 0 || isNaN(size)) {
        errors.maxPrice = "Minimum price must be greater than or equal to 0";
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: errors,
        });
}

    page = Number( page )
    size = Number(size)

    const spots = await Spot.findAll({
        where: {
            lat: { [Op.between]: [minLat, maxLat] },
            lng: { [Op.between]: [minLng, maxLng] },
            price: { [Op.between]: [minPrice, maxPrice] },
        },
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
            }
        ],
      
        offset: (page - 1) * size,
        limit: size,
    });

    for ( let spot of spots ) {
        console.log(spot.dataValues.SpotImages, "spot images")
        if (!spot.dataValues.SpotImages.length) {
                message = "This Spot does not have images.";
                spot.dataValues.previewImage = message 
                delete spot.dataValues.SpotImages;   
        } else {
            for ( let image of spot.SpotImages ) {   
            spot.dataValues.previewImage = image.url;
        }
        delete spot.dataValues.SpotImages;
        };

        let sum = 0;
        for ( let review of spot.Reviews ) {
            sum += review.dataValues.stars;
        };
        average = sum/spot.Reviews.length;
        spot.dataValues.avgRating = average;
        if ( !spot.dataValues.avgRating ) {
            spot.dataValues.avgRating = "This spot has not been rated."
        }
        delete spot.dataValues.Reviews;
    }
    return res.json({ "Spots": spots, page, size });
});



module.exports = router;