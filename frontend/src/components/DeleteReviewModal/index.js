import React, { useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import './DeleteReview.css'

function DeleteReviewModal(review) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const user = useSelector((state)=> state.session)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    return dispatch(reviewActions.fetchDeleteReview(review.reviewId))
        .then(dispatch(reviewActions.fetchReviews(review.spotId)))
        .then(dispatch(spotActions.fetchSpotDetails(review.spotId)))
        .then(closeModal)
        .catch(
        );
  };

  return (
    <div className="delete-review-container">
      <h3>Confirm Delete</h3>
      <h5>Are you sure you want to delete this review?</h5>
      <button type='submit' onClick={handleSubmit} className='confirm-delete-btn'>Yes (Delete Review)</button>
      <button onClick={closeModal} className='refuse-delete-btn'>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;