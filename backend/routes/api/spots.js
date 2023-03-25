const express = require('express');
const {Sequelize, Op} = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, body, validationResult } = require('express-validator');
const { handleSpotValidationErrors, handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


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
    handleSpotValidationErrors
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
        message: 'Unauthorized user',
        // statusCode: 401,
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


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
    
    const spotId = req.params.spotId 
    const newImage = req.body 
    // console.log(req.body, "<<<<<<<BODY>>>>>>>>")
    
    const {user} = req
    // console.log(req, "<<<<<<<req>>>>>>>>")
  
    try {
        newImage.spotId = spotId
        // console.log(newImage.spotId, "<<<<<<<HERE>>>>>>>>")
        const spot = await Spot.findOne({ 
            where: { 
                id: spotId, 
                ownerId: user.id 
            } 
        })
        
        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
       
        if(spot.ownerId !== user.id ){
          return res.status(403).json({
            message: 'Unauthorized user'
          })
        }
     
        const addImage = await spot.createSpotImage({
            spotId: req.params.spotId,
            url: req.body.url,
            preview: req.params.preview
        })
        
        delete addImage.dataValues.createdAt;
        delete addImage.dataValues.updatedAt;
        return res.status(201).json(addImage)      
        
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        statusCode: 500
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
    

    // const newspot = await Spot.create({
    //     ownerId,
    //     address,
    //     city,
    //     state,
    //     country,
    //     lat,
    //     lng,
    //     name,
    //     description,
    //     price
    // })
    // if (newspot) {
    //     return res.status(201).json(newspot)
    // }
    // else return res.status(400).json({message: "validation error"});


})
// Get all Spots owned by the Current User
// Returns all the spots owned (created) by the current user.
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    
    // console.log(req.user, "here")
    const userId = req.user.dataValues.id;
    const userSpots = await Spot.findAll({
        
            where: { ownerId: userId},
            include: [
                { model: Review, attributes: ['stars'] },
                { model: SpotImage, attributes: ['url'] }
            ]
    });

    // let avgRating = 0;
    // console.log(userSpots[0].dataValues.Reviews, ">>>>>>>>>RATINGS<<<<<<<<")
    for (let i = 0; i < userSpots.length; i++) {
        const ratings = userSpots[i].dataValues.Reviews;
        // console.log(ratings, ">>>>>>>>>RATINGS<<<<<<<<")
    if(ratings.length) {
        avgRating = 0;
        for (let j = 0; j < ratings.length; j++) {
            avgRating += ratings[j].dataValues.stars;
        }
        userSpots[i].dataValues.avgRating = avgRating/ratings.length;
    }else{
        userSpots[i].dataValues.avgRating = null;
    }
    const url = userSpots[i].dataValues.SpotImages;
    // console.log(url, "url")
    if (url.length) {
        userSpots[i].dataValues.previewImage = url[0].dataValues.url;
    }else {
        userSpots[i].dataValues.previewImage = null;
    }
      delete userSpots[i].dataValues.Reviews;
      delete userSpots[i].dataValues.SpotImages;
    }
    

    return res.status(200).json({"Spots":userSpots})
});

//Get details of a Spot from an id
//Returns the details of a spot specified by its id.
router.get('/:spotId', async (req, res) => {
    // console.log(req.params)
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId,{
        include: [
            {model: SpotImage, attributes: ["id", "url", "preview"]},
            {model: User, attributes:["id", "firstName", "lastName"], as: "Owner"},
            {model: Review}
        ]

    })
    spot.dataValues.numReviews = spot.dataValues.Reviews.length;

    if (spot.dataValues.Reviews.length) {
        let sum = 0;
        for (let i =0; i < spot.dataValues.Reviews.length; i++) {
            sum += spot.dataValues.Reviews[i].dataValues.stars
        }
        spot.dataValues.avgStarRating = sum / spot.dataValues.Reviews.length;
    } else {
        spot.dataValues.avgStarRating = null;
    } 


    if (spot) {
        delete spot.dataValues.Reviews;
        return res.status(200).json({spot})
    }
        else return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
    })
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


//Get all spots; add an average stars rating and
// url to spotImage
router.get('/', async (req, res, next) => {
    
    const spots = await Spot.findAll({
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            // [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
            // [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
        ],
        
        include: [
            {model: Review, attributes: ['stars']},
            {model: SpotImage, attributes: ['url', 'preview']}
        ]
    });

    for (let i = 0; i < spots.length; i++) {
        const ratings = spots[i].dataValues.Reviews;
        // console.log(ratings, ">>>>>>>>>RATINGS<<<<<<<<")
        if(ratings.length) {
            avgRating = 0;
            for (let j = 0; j < ratings.length; j++) {
                avgRating += ratings[j].dataValues.stars;
            }
            spots[i].dataValues.avgRating = avgRating/ratings.length;
        }else{
            spots[i].dataValues.avgRating = null;
        }
        const url = spots[i].dataValues.SpotImages;
        // console.log(url, "url")
        if (url.length) {
            spots[i].dataValues.previewImage = url[0].dataValues.url;
        }else {
            spots[i].dataValues.previewImage = null;
        }
        delete spots[i].dataValues.Reviews;
        delete spots[i].dataValues.SpotImages;
        }
   
    
    return res.status(200).json({
        "Spots": spots
    })
})

module.exports = router;