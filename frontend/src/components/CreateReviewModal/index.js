import React, { useState, useEffect } from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateReview.css'

function CreateReviewModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector((state)=> state.session)

  const handleStarRtg = (e, value) => {
    e.preventDefault();
    setStars(value)
  }

  const handleSubmit = async (e) => {
    console.log("<<<<<<<<<<In CreateReviewModal handle submit")
    e.preventDefault();
    
    const data = { 
      spotId,
      review,
      stars      
    };

    const errors = {};
    // if (stars === '' || review.length < 10 ) {
    //   setErrors(errors);
    //   errors.errMessage = 'Star rating and a minimum of 10 characters are required to review this spot.'
    //   return
    // }
  
         await dispatch(reviewActions.fetchAddReview(data))
         await dispatch(reviewActions.fetchReviews(spotId))
        .then(dispatch(spotActions.fetchSpotDetails(spotId)))
        .then(closeModal)
        .catch(
        );


  };

  return (
    <div className="create-review-container">
      <div className="review-modal-title">
        <h2>How was your stay?</h2>
        {errors && <div className="errors">{errors.errMessage}</div>}
      </div>
          <textarea 
            className="review-text-box" 
            value={review} 
            onChange={e => setReview(e.target.value)}
            placeholder='Leave your review here...'
            required={true}>
          </textarea>
            <div className="stars-container">
              <h6 className="stars-title">Stars</h6>
                <i onClick={(e) => {handleStarRtg(e, 1)}} className={stars < 1 ? "fa-regular fa-star" : "fa-solid fa-star"} />
                <i onClick={(e) => {handleStarRtg(e, 2)}} className={stars < 2 ? "fa-regular fa-star" : "fa-solid fa-star"} />
                <i onClick={(e) => {handleStarRtg(e, 3)}} className={stars < 3 ? "fa-regular fa-star" : "fa-solid fa-star"} />
                <i onClick={(e) => {handleStarRtg(e, 4)}} className={stars < 4 ? "fa-regular fa-star" : "fa-solid fa-star"} />
                <i onClick={(e) => {handleStarRtg(e, 5)}} className={stars < 5 ? "fa-regular fa-star" : "fa-solid fa-star"} />
                <button 
                  className="review-btn" 
                  type='submit' 
                  disabled={stars === 0 || review.length < 10}
                  onClick={handleSubmit}
                  >Submit Your Review</button>
            </div>
    </div>
  )
}


export default CreateReviewModal