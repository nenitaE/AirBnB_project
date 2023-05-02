import { csrfFetch } from "./csrf";

//SPOTS ACTION TYPES
    //get all spots
const GET_SPOTS = 'spots/getSpots'
    //get one spot
const GET_SPOT = 'spots/getSpot'
    //get users spots
const GET_USER_SPOTS = 'spots/getCurrSpots'
    //add new spot
const ADD_SPOT = 'spots/addSpot'
    //edit an existing spot
const EDIT_SPOT = 'spots/editSpot'
    //delete a spot
const DELETE_SPOT = 'spots/deleteSpot'

//SPOTS ACTION CREATORS
    //get all spots
const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
};
  
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
      credential,
      password,
      }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};  


//SESSION REDUCER
const initialState = { 
    user: null 
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const  data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export default sessionReducer;