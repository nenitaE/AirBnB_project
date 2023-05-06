import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../../store/spots';
import './Spots.css';

function AllSpots() {
    
    
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] =useState(false)
    const spots = useSelector(state => state.spots);
    
    useEffect(() => {
        dispatch(fetchSpots()).then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!spots) return null;

    const allSpots = Object.values(spots);

    return (
        <div className='spots-container'>
                { allSpots.map((spot) => (
                    <div className='spot-grid' key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>
                            <img className='spot-images' src={spot.previewImage} alt="spot images" width="320" height="240"/>
                            <div className="spot-loc">{spot.city},{spot.state}</div>
                            <div className="spot-price">${spot.price} night</div>
                            <div className="spot-rating">{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : 'New'}</div> 
                        </Link>
                    </div>
                ))}
            </div>
    )
};
    
export default AllSpots;