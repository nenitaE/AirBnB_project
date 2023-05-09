import React, { useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import './DeleteReview.css'

function DeleteReviewModal(reviewId, spotId) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const user = useSelector((state)=> state.session)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    return dispatch(reviewActions.fetchDeleteReview(reviewId))
        .then(dispatch(reviewActions.fetchReviews(reviewId.spotId)))
        .then(dispatch(spotActions.fetchSpotDetails(reviewId.spotId)))
        .then(closeModal)
        .catch(
        );
  };

  return (
    <div className="delete-review-container">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this review?</h3>
      <button type='submit' onClick={handleSubmit} className='confirm-delete-btn'>Yes (Delete Review)</button>
      <button onClick={closeModal} className='refuse-delete-btn'>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;