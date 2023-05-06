import React, { useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import './DeleteSpot.css'

function DeleteSpotModal(spot) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const owner = useSelector((state)=> state.session)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    return dispatch(spotActions.fetchDeleteSpot(spot.prop))
      .then(closeModal)
      .catch(
      );
  };

  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <button type='submit' onClick={handleSubmit} className='confirm-delete-btn'>Yes (Delete Spot)</button>
      <button onClick={closeModal} className='refuse-delete-btn'>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteSpotModal;