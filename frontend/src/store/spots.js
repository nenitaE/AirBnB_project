import { csrfFetch } from "./csrf";

//SPOTS ACTION TYPES
    //get all spots
const GET_SPOTS = 'spots/getSpots'
    //get one spot
const GET_SPOT_DETAILS = 'spots/getSpotDetails'
    //get details of users spots 
const MANAGE_SPOTS = 'spots/manageSpots'
    //add new spot
const CREATE_SPOT = 'spots/createSpot'
    //update an existing spot
const UPDATE_SPOT = 'spots/updateSpot'
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

    //get one spot's details
const getSpotDetails = (spot) => {
    return {
      type: GET_SPOT_DETAILS,
      payload: spot,
    };
};

    //get users spots
const manageSpots = (spots) => {
    return {
      type: MANAGE_SPOTS,
      payload: spots,
    };
};

    //add spot
const createSpot = (spot) => {
    return {
      type: CREATE_SPOT,
      payload: spot,
    };
};

    //updatea a spot
const updateSpot = (spot) => {
    return {
      type: UPDATE_SPOT,
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
    console.log("in store /spots thunk")
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(getSpots(spots));
        return payload;
    }

};  
    //get one spot
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch('/api/spots/${spotId}')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(getSpotDetails(spot));
        return payload;
    }
};  


    //get users spots
export const fetchmanageSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(manageSpots(spots));
        return payload;
    }
};  


    //add spot
// export const fetchCreateSpot = () => async (dispatch) => {
//     const response = await csrfFetch('/api/spots/${spotId}')

//     if (response.ok) {
//         const payload = await response.json();
        
//         dispatch(createSpot(spot));
//         return payload;
//     }
// };


//edit a spot
// export const fetchEditSpot = (payload) => async (dispatch) => {
//     const response = await csrfFetch('/api/spots/${spotId}', {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     })

//     if (response.ok) {
//         const spot = await response.json();
        
//         dispatch(editSpot(spot));
//         return spot;
//     }
// };  


    //delete spot
export const fetchDeleteSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots/${spot}', {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSpot(spot));
    }    
        return response;
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
    case GET_SPOT_DETAILS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    case MANAGE_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.payload;
      return newState;
    // case CREATE_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.spots = action.payload;
    //   return newState;
    // case UPDATE_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.spots = action.payload;
    //   return newState;
    case DELETE_SPOT:
      const deletedSpot = action.deleteSpot;
      delete newState.userSpots[deletedSpot];
      return newState;
    
    default:
      return state;
  }
};

export default spotReducer;