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
    console.log(reviews, "****************reviews DETAILS")
    
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

    if (!spotDetails) return null;
    
    // if (!spotReviews) return null
   

    const {
        name,
        city,
        state,
        country,
        description,
        price,
        avgStarRating,
        numReviews,
        SpotImages
      } = spotDetails


    return (
        <div className='spot-details-container'>
            {isLoaded && (
                <div>
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
                                            <h3>${spotDetails.price} night &#x2605; <span> {Number(spotDetails.avgStarRating) ? Number(spotDetails.avgStarRating).toFixed(1) : 'New '} </span> 
                                                {spotDetails.numReviews > 0 && <span>&#x2022;</span>}   
                                                {spotDetails.numReviews == 1 && <span> {spotDetails.numReviews} Review</span>}
                                                {spotDetails.numReviews > 1 && <span> {spotDetails.numReviews} Reviews</span>}
                                            </h3>
                                        </div>
                                        <span>
                                            <button className='res-button' onClick={() => alert('Feature Coming Soon...')}>RESERVE</button>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <div className='spot-reviews-container'>
                            <div className="spot-review-details">
                                <div className="spot-avgStar-numReviews">
                                    <p>&#x2605; 
                                        <span> {Number(spotDetails.avgStarRating) ? Number(spotDetails.avgStarRating).toFixed(1) : 'New '} </span> 
                                        {spotDetails.numReviews > 0 && <span>&#x2022;</span>}   
                                        {spotDetails.numReviews == 1 && <span> {spotDetails.numReviews} Review</span>}
                                        {spotDetails.numReviews > 1 && <span> {spotDetails.numReviews} Reviews</span>}
                                    </p>
                                </div>
                            </div>
                            {user && user.id !== spotDetails.Owner.id &&
                                !reviews.some(review => review.userId === user.id) && (
                                    <div>
                                        <OpenModalButton 
                                        buttonText="Post Your Review"
                                        modalComponent={<CreateReviewModal spotId={id}/>}
                                        onButtonClick={closeModal}
                                        />
                                    </div>
                                )
                            }
                        {reviews.length > 0 ? (
                            <ul className='list-spot-reviews'>
                                {reviews.map(review => {
                                    const date = new Date(review.updatedAt).toLocaleDateString('en-US',
                                        {
                                            month: 'long',
                                            year: 'numeric'
                                        }) 
                                    return (
                                            <div className='spot-review-data' key={review.id}>
                                                <div>
                                                    {/* <h3 className='spot-reviewer'>{review.User.firstName}</h3> */}
                                                    <p className='spot-review-date'>{date}</p> 
                                                    <div className='spot-review'>{review.review}</div>
                                                </div>
                                                {user && user.id === review.userId && (
                                                    <OpenModalButton
                                                        buttonText="Delete"
                                                        modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotDetails.id}/>}
                                                        onButtonClick={closeModal}
                                                    />)}
                                            </div>
                                    )
                                }
                                )}
                            </ul>) : ( user && user.id !== spotDetails.ownerId && (
                                            <h3>Be the first to post a review!</h3>
                                        )
                                    )
                        }
                        </div> 
                </div>               
            )
            }
        </div>
    )
}

export default SpotDetails