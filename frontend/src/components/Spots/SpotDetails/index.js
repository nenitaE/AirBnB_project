import { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../../store/spots';
import './SpotDetails.css';

function SpotDetails () {
    // console.log("Inside Spot Details component>>>>>>>>>>>>>>")
    const {id} = useParams();
    const spotDetails = useSelector(state => state.spots[id]);
    // console.log(spotDetails, "SPOTDETAILS")
    const dispatch = useDispatch();
    const reserveContainer = useRef(null);

    // console.log("SpotDetails component----before dispatching fetchSpotDetails")

    useEffect(() => {
        dispatch(fetchSpotDetails(id))
    }, [dispatch, id]);
    // console.log("SpotDetails component----AFTER dispatching fetchSpotDetails")
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
            <h1 className='spot-name'>{name}</h1>
                <div className='spot-details-grid'>
                    <div className='spot-details-location'>
                        {city}, {state}, {country}
                    </div> 
                    <div className='spot-details-images'>
                        <img src= {previewImage.url} key={previewImage.id} alt={previewImage.id} width="320" height="240" />
                    </div>
                        <div className='spot-info-container'>
                            <div className='spot-container-text'>
                                <h2>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h2>
                                <div className='spot-description'>{description}</div>
                            </div>
                            <div className='resContainer'>
                                <div className='res' ref={reserveContainer}>
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
                        </div>
                    </div>         
            </div>
        </div>
    )

}

export default SpotDetails