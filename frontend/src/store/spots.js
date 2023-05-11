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
    //add preview image 
const ADD_IMAGES = 'spots/addImages'


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
const createSpot = (newSpot) => {
    return {
      type: CREATE_SPOT,
      payload: newSpot,
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
    //add images
const addImages = (image) => {
    return {
      type: ADD_IMAGES,
      image
    };
};
  

//SPOTS THUNK ACTIONS

    //get all spots

export const fetchSpots = () => async (dispatch) => {
    
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const payload = await response.json();
        
        dispatch(getSpots(payload.Spots));
        return payload;
    }

};  
    //get one spot
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    console.log("in store /spotDetails thunk")
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const payload = await response.json();
        console.log(payload.spot, "In thunk action>>>SPOT DETAILS PAYLOAD<<<<<<<<<<<")
        
        dispatch(getSpotDetails(payload.spot));
        return payload;
    }
};  


    //get users spots
export const fetchManageSpots = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const details = await response.json();

    if (response.ok) {
    let filteredSpots = Object.values(details);
    const ownerSpots = filteredSpots.filter(spot => spot.ownerId === user.user.id);
    
    let ownerSpotsObj = {};

    ownerSpots.map(spot => ownerSpotsObj[spot.id] = spot);
    return dispatch(fetchSpots(ownerSpotsObj));
    }
};  

    //add preview image to spot
export const fetchAddImage = (user) => async (dispatch) => {

}

    //create spot
export const fetchCreateSpot = (payload) => async (dispatch) => {
    console.log("in store /createSpot thunk")
    let { imagesArr } = payload;
    console.log(payload, "payload of imagesArr>>>>>>>>>>>>>>>> IN STORE CREATE SPOT THUNK")
   
    
    imagesArr = imagesArr.map((url, i) => {
        let obj = {};
        if (i === 0) {
            obj.preview = true;
            obj.url = url;
        } else {
            obj.preview = false;
            obj.url = url;
        }
        return obj;
    });

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newSpot = await response.json();
        console.log(newSpot, "In thunk action>>>create spot newSpot<<<<<<<<<<<")
        

        for await (let image of imagesArr) {
            let imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(image)
            })
            imageRes = await imageRes.json();
            dispatch(addImages(imageRes))
        }

        dispatch(createSpot(newSpot));
        return newSpot;
    }
};


//update a spot thunk action
export const fetchEditSpot = (spot) => async (dispatch) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        SpotImages
        } = spot;

    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const updatedSpot = await response.json();
        
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};  


    //delete spot
export const fetchDeleteSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    })
    const details = await response.json();
    if (response.ok) {
        dispatch(deleteSpot(details));
    }    
};  


//SESSION REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS:
        action.payload.forEach(spot => {
            newState[spot.id] = spot;
        })
        return newState;
    case GET_SPOT_DETAILS:
        newState = {...state, [action.payload.id]: action.payload}
        return newState;
    case MANAGE_SPOTS:
        newState = Object.assign({}, state);
        newState.spots = action.payload;
        return newState;
    case CREATE_SPOT:
        console.log(action.payload, "in createSpot Reducer>>>>newSpot<<<<<<<<")
        newState = {...state, [action.payload.id]: action.payload}
        return newState;
    case UPDATE_SPOT:
        newState = {...state, [action.payload.id]: {...state, ...action.spot}};
        return newState;
    case ADD_IMAGES:
        // newState = {...state, [action.image.id]: {...state, [action.payload.spotId.SpotImages]: action.payload.image}};
        newState = {...state, [action.image.id]: {...state[action.image.id]}};
        return newState;
    case DELETE_SPOT:
        newState = {...state};
        delete newState[action.payload.id]
        return newState;
    
    default:
      return state;
  }
};

export default spotReducer;