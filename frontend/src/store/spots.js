import { csrfFetch } from "./csrf";

//SPOTS ACTION TYPES
    //get all spots
const GET_SPOTS = 'spots/getSpots'
    //get one spot
const GET_SPOT = 'spots/getSpot'
    //get users spots
const GET_USER_SPOTS = 'spots/getUserSpots'
    //add new spot
const ADD_SPOT = 'spots/addSpot'
    //edit an existing spot
const EDIT_SPOT = 'spots/editSpot'
    //delete a spot
const DELETE_SPOT = 'spots/deleteSpot'

//SPOTS ACTION CREATORS
    //get all spots
const getSpots = (spots) => {
    return {
      type: GET_SPOTS,
      payload: spots,
    };
};

    //get one spot
const getSpot = (spot) => {
    return {
      type: GET_SPOT,
      payload: spot,
    };
};

    //get users spots
const getUserSpots = (spots) => {
    return {
      type: GET_USER_SPOTS,
      payload: spots,
    };
};

    //add spot
const addSpot = (spot) => {
    return {
      type: ADD_SPOT,
      payload: spot,
    };
};

    //edit a spot
const editSpot = (spot) => {
    return {
      type: EDIT_SPOT,
      payload: spot,
    };
};

    //delete spot
const deleteSpot = (spot) => {
    return {
      type: DELETE_SPOT,
      payload: spot,
    };
};
  

//SPOTS THUNK ACTIONS

    //get all spots

export const fetchSpots = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(getSpots(spots));
        return payload;
    }

};  
    //get one spot

export const fetchSpot = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots/${spotId}')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(getSpot(spot));
        return payload;
    }
};  


//SESSION REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    
    default:
      return state;
  }
};

export default spotReducer;