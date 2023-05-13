import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../../store/spots";
import * as reviewActions from "../../../store/reviews";
import { useParams } from 'react-router-dom';
import CreateReviewModal from '../../CreateReviewModal';
import DeleteReviewModal from '../../DeleteReviewModal';
import { useModal } from '../../../context/Modal';
import OpenModalButton from '../../OpenModalButton';
import DisplayReviews from '../../DisplayReviews'
import './SpotReviews.css';

function SpotReviews () {

    const {id} = useParams();
    const { closeModal } = useModal();
    const spotDetails = useSelector(state => state.spots[id]);
    console.log(spotDetails, "In SPOTReviewSSSSSSSSSSS")


    const reviews = useSelector(state => Object.values(state.reviews));
    console.log(reviews, "reviews DETAILS")
    
    const user = useSelector(state => state.session.user);
    console.log(user, "user DETAILS")

    //check if user has already reviewed this spot
    const userHasReviewed = reviews.some((review) => review.userId === user?.id);

    // sort the reviews in descending order
    const descendingReviews = [...reviews].sort((oldest, newest) => new Date(newest.date) - new Date(oldest.date));
    const dispatch = useDispatch();

    console.log("SpotReviews component----before dispatching fetchSpotReviews")

    useEffect(() => {
        dispatch(reviewActions.fetchReviews(id))
    }, [dispatch]);

    console.log("SpotReviews component----AFTER dispatching fetchSpotReviews")
    const handleDelete = (reviewId) => {
        dispatch(reviewActions.fetchDeleteReview(reviewId))
    }
    

return (
        <div className='spot-reviews'>
            {spotDetails?.ownerId !== user?.id && !userHasReviewed && user &&   (
                <>
                <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal spotId={spotDetails.id}/>}
                        onButtonClick={closeModal}
                />
                </>
            )}
            {reviews.length ? (
                reviews.map((review) => {
                    const userReview = review.userId === user?.id;
                    return (
                        <div className="spot-review-container" key={review.id}>
                        <DisplayReviews review={review} />
                        {userReview && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotDetails.id}/>}
                                onButtonClick={closeModal}
                            />
                        )}
                        </div>
                    );
                })
                ) : (<p> </p>
                
            )}
            {spotDetails.ownerId !== user.id && !userHasReviewed && !reviews.length && (
                <p>Be the first to leave a review!</p>
            )}
        </div>
    );
};

export default SpotReviews;