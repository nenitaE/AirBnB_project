import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../../store/spots';
import './Spots.css';

function AllSpots() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] =useState(false)
    const spots = useSelector(state => state.spots);
    
    useEffect(() => {
        dispatch(fetchSpots()).then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!spots) return null;

    const allSpots = Object.values(spots);

    const handleClick = spotId => {
        history.push(`/spots/${spotId}`)
      }

    return (
        <div className='spots-container'>
            {allSpots.map(spot => {
            return (
                <div
                    className='spot-tooltip'
                    key={spot.id}
                    onClick={() => handleClick(spot.id)}
                    data-name={spot.name}>
                    <div className='toolip-on-hover'></div>
                    <div className='tooltip' title={spot.name}></div>
                    <div className='spot-image'>
                        <img
                            className='spot-preview-image'
                            src={spot.previewImage || null}
                            alt={`${spot.name} images`}
                            width="320" height="240"
                        />
                    </div>
                    <div className='spot-container'>
                            <div className='spot-location'>
                                        <div className='location'>
                                            {spot.city}, {spot.state}
                                        </div>
                                    <div className='spot-stars'>
                                        <span className='stars'>
                                            <p className='star-icon'>&#x2605; 
                                                {Number(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'New'}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className='spot-data'>
                                    <p className='spot-price'>
                                        <div className='price'>
                                            <p>${spot.price} </p> night</div>
                                    </p>
                                </div>
                            </div>
                        </div>
                )
            })}
        </div>
    )
};
    
export default AllSpots;