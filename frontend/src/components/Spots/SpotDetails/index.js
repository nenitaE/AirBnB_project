import { useEffect, useState } from 'react';
import * as spotActions from "../../../store/spots";
import * as reviewActions from "../../../store/reviews";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import CreateReviewModal from '../../CreateReviewModal';
import DeleteReviewModal from '../../DeleteReviewModal';
import './SpotDetails.css';
import OpenModalButton from '../../OpenModalButton';
import SpotReviews from '../SpotReviews';

function SpotDetails () {
    console.log("Inside Spot Details component>>>>>>>>>>>>>>")

    
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const {id} = useParams();
    const { closeModal } = useModal();
    const spotDetails = useSelector(state => state.spots[id]);
    console.log(spotDetails, "SPOTDETAILS")
    
    const reviews = useSelector(state => Object.values(state.reviews));
    console.log(reviews, "reviews DETAILS")
    
    const user = useSelector(state => state.session.user);
    console.log(user, "user DETAILS")
    
    const dispatch = useDispatch();


    console.log("SpotDetails component----before dispatching fetchSpotDetails & fetchReviews")

    useEffect(() => {
        dispatch(spotActions.fetchSpotDetails(id))
        .then(dispatch(reviewActions.fetchReviews(id)))
        .then(() => setIsLoaded(true))
    }, [dispatch, id]);

    console.log("SpotDetails component----AFTER dispatching fetchSpotDetails")

    
    //get reviews for this spot
    // const spotReviews = reviews.filter(review => review.spotId === Number(id));
    
    //create empty Array to hold reviews if logged in user is the person who reviewed spot
    // let reviewsArr = [];
    // if(user) {
    //     reviewsArr = reviews.filter(review => review.userId === user.id)
    // }
    // console.log(reviewsArr, "SSSSSSPPPOOOOOOT REVIEWSSSSSSSS")
    
    // console.log(reviewsArr, "reviewsArr in SpotDetails component----AFTER dispatching fetchreviews")



    if (!spotDetails) return null;

    // const {
    //     name,
    //     city,
    //     state,
    //     country,
    //     description,
    //     price,
    //     avgStarRating,
    //     numReviews,
    //     SpotImages
    //   } = spotDetails


    return (
        <div>
            {isLoaded && (<div>
                <div className='spot-details-container'>
                    <h1 className='spot-name'>{spotDetails.name}</h1>
                        <div className='spot-details-grid'>
                            <div className='spot-details-location'>
                                {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
                            </div> 
                            <div className='spot-details-images'>
                                {spotDetails.SpotImages && spotDetails.SpotImages.map((img, i) => {
                                return <img className={`image${i}`} src= {img.url} key={img.id} alt={img.id} width="320" height="240" />;
                                })}
                            </div>
                                <div className='spot-info-container'>
                                    <div className='spot-container-text'>
                                        <h2>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h2>
                                        <div className='spot-description'>{spotDetails.description}</div>
                                    </div>
                                    <div className='resContainer'>
                                        <div className='res-box-text'>
                                            <h3>${spotDetails.price}/night
                                                <div className='stars'>
                                                    <p>&#x2605; {spotDetails.avgStarRating.toFixed(1)} &#x2022;  {spotDetails.numReviews} reviews</p>
                                                </div>
                                            </h3>
                                        </div>
                                        <div>
                                            <button className='res-button' onClick={() => alert('Feature Coming Soon...')}>RESERVE</button>
                                        </div>
                                    </div>
                                </div>
                                    <div className='spot-reviews-container'>
                                    <SpotReviews />
                                        {/* <div className="spot-review-details">
                                            <div className="spot-avgStar-numReviews">
                                            <p>&#x2605; {spotDetails.avgStarRating.toFixed(1)} &#x2022;  {spotDetails.numReviews} reviews</p>
                                            </div>
                                        </div>
                                            {spotReviews.reverse().map(review => 
                                                <div className="review-data" key={review.id}>{review.review} 
                                                    {!user || user.id === review.userId && (
                                                        <OpenModalButton
                                                            buttonText="Delete"
                                                            modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotDetails.id}/>}
                                                            onButtonClick={closeModal}
                                                        />)}
                                                </div>
                                            )}

                                            {!user || user.id !== spotDetails.ownerId && (
                                            <OpenModalButton 
                                                buttonText="Post Your Review"
                                                modalComponent={<CreateReviewModal spotId={id}/>}
                                                onButtonClick={closeModal}
                                            />)} */}
                                    </div>
                                </div>        
                        </div>
                
                </div>
            )}
        </div>
    )

}

export default SpotDetails