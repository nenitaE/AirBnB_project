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
        <div>
            <ul className='spots-list'>
                {
                allSpots.map((spot) =>(
                    <Link to={`/spots/${spot.id}`} key={spot.id}>
                        <img className='spot-images' src={spot.previewImage} alt="spot images"/>
                    </Link>
                ))}
            </ul>
        </div>
    )
};
    
export default AllSpots;