import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateSpot } from '../../../store/spots';
import './AddSpot.css';

function AddSpot() {
    console.log("addSpot component")
    const newSpots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    console.log("allSpots component----before dispatching fetchSpots")

    

}