import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal'
import CreateSpotForm from '../CreateSpotForm'
import './CurrentUser.css'


function CurrentUserSpots() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    let spots = useSelector((state) => state.spots)
    let user = useSelector((state)=> state.session)
    spots = Object.values(spots)

    spots = spots.filter(spot=> spot.ownerId === user.user.id)

    useEffect(() => {
    dispatch(spotActions.fetchManageSpots(user)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const closeMenu = () => setShowMenu(false);

    return (
        <div>
            <h2>Manage Spots</h2>
            {!spots.length && (
                <ul>
                    <NavLink to="/spots/new" className='create-new-spot-link'>Click Here to Create a New Spot</NavLink>
                </ul>
            )}
        <div className="current-spots-container">
        {isLoaded && 
        spots.map((spot) => 
        (<div className='spot-grid' key={spot.id}>
            <Link to={`/spots/${spot.id}`}>
                <img className='current-spot-images' src={spot.previewImage} alt="spot images" width="320" height="240"/>
                <div className="spot-loc">{spot.city}, {spot.state}</div>
                <div className="spot-price">${spot.price} night</div>
                <div className="spot-rating">{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : '   New'}</div> 
            </Link>
            <div>
            <button className="update-spot-btn"><NavLink to={`/spots/${spot.id}/edit`}>UPDATE</NavLink></button>
            <button className="delete-spot-btn"><OpenModalMenuItem
                itemText="DELETE"
                onItemClick={closeMenu}
                modalComponent={<DeleteSpotModal prop={spot}/>}
                /></button>
            </div>
            </div>))}
        </div>
        </div>
    )
}

export default CurrentUserSpots