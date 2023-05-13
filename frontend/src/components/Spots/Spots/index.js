import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../../store/spots';
import SpotTile from '../SpotTile';
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
            {allSpots.map(spot => (
                <Link to={`/spots/${spot.id}`} key={spot.id}>
                <SpotTile spot={spot} />
              </Link>
            ))}
        </div>
    )
};
    
export default AllSpots;