import { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../../store/spots';
import './SpotDetails.css';

function SpotDetails () {
    console.log("Inside Spot Details component>>>>>>>>>>>>>>")
    const {id} = useParams();
    const spotDetails = useSelector(state => state.spots[id]);
    console.log(spotDetails, "SPOTDETAILS")
    const dispatch = useDispatch();

    console.log("SpotDetails component----before dispatching fetchSpotDetails")

    useEffect(() => {
        dispatch(fetchSpotDetails(id))
    }, [dispatch, id]);
    console.log("SpotDetails component----AFTER dispatching fetchSpotDetails")
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

    const previewImage = spotDetails.SpotImages.find(img => img.preview);

    return (
        <div className='spot-details-container'>
            <div className='spot-details-grid'>
                <h1>{name}</h1>
                    <div className='spot-details-location'>
                        {city}, {state}, {country}
                    </div> 
                    <div className='spot-details-images'>
                        <img src= {previewImage.url} key={previewImage.id} alt={previewImage.id} />
                    </div>
            </div>
        </div>
    )

}

export default SpotDetails