import { useEffect, useState } from 'react';
import * as spotActions from "../../../store/spots";
import * as reviewActions from "../../../store/reviews";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SpotDetails.css';

function SpotDetails () {
    console.log("Inside Spot Details component>>>>>>>>>>>>>>")

    
    const [isLoaded, setIsLoaded] = useState(false);
    const {id} = useParams();
    
    const spotDetails = useSelector(state => state.spots[id]);
    console.log(spotDetails, "SPOTDETAILS")
    
    const reviews = useSelector(state => Object.values(state.reviews));
    console.log(reviews, "reviews DETAILS")
    
    const user = useSelector(state => state.session.user);
    console.log(user, "user DETAILS")
    
    const dispatch = useDispatch();
  

    console.log("SpotDetails component----before dispatching fetchSpotDetails & fetchReviews")

    useEffect(() => {
        dispatch(spotActions.fetchSpotDetails(id)).then(dispatch(reviewActions.fetchReviews(id))).then(() => setIsLoaded(true))
    }, [dispatch, id]);
    console.log("SpotDetails component----AFTER dispatching fetchSpotDetails")

    let reviewsArr = [];
    
    const spotReviews = reviews.map(review => review.spotId === Number(id));
    
    if(user) {
        reviewsArr = reviews.map(review => review.userId === user.id)
    }
    console.log(spotReviews, "spotReviews in SpotDetails component----AFTER dispatching fetchreviews")



    if (!spotDetails) return null;

    const {
        name,
        city,
        state,
        country,
        description,
        price,
        avgStarRating,
        numReviews
      } = spotDetails


    return (
        <div>
            {isLoaded && (<div>
                <div className='spot-details-container'>
                    <h1 className='spot-name'>{name}</h1>
                        <div className='spot-details-grid'>
                            <div className='spot-details-location'>
                                {city}, {state}, {country}
                            </div> 
                            <div className='spot-details-images'>
                            {spotDetails.SpotImages.map(previewImage => <img src= {previewImage.url} key={previewImage.id} alt={previewImage.id} width="320" height="240" />)}
                            </div>
                                <div className='spot-info-container'>
                                    <div className='spot-container-text'>
                                        <h2>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h2>
                                        <div className='spot-description'>{description}</div>
                                    </div>
                                    <div className='resContainer'>
                                        <div className='res-box-text'>
                                            <h3>${price}/night
                                                <div className='stars'>
                                                    <p>&#x2605; {avgStarRating.toFixed(1)} &#x2022;  {numReviews} reviews</p>
                                                </div>
                                                
                                            </h3>
                                        </div>
                                        <div>
                                            <button className='res-button' onClick={() => alert('Feature Coming Soon...')}>RESERVE</button>
                                    </div>
                                </div>
                                <div className='spot-reviews-container'>
                                <button className='review-button' onClick={() => alert('Feature Coming Soon...')}>Post Your Review</button>

                                </div>
                            </div>         
                    </div>
                </div>
            </div>)}
        </div>
    )

}

export default SpotDetails