import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchSpots } from '../../../store/spots'
import './Spots.css'

function getAllSpots() {
    const spots = useSelector(state => state.spots.spots);
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    
}
