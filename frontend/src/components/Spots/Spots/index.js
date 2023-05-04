import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../../store/spots';
import './Spots.css';

function AllSpots() {
    console.log("allSpots component")
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();
   
    console.log("allSpots component----before dispatching fetchSpots")
    
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch]);

    if (!spots) return null;

    const allSpots = Object.values(spots);

    return (
        <div className='spots-container'>
            <div>
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
        </div>
    )
};
    
export default AllSpots;