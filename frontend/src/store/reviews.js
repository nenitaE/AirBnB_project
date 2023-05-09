import { csrfFetch } from "./csrf";

//REVIEWS ACTION TYPES
    //get all reviews
const GET_REVIEWS = 'spots/getReviews';
    //add review
const ADD_REVIEW = 'spots/addReview';
     //delete review
const DELETE_REVIEW = 'spots/deleteReview';


//REVIEWS ACTION CREATORS
    //get all reviews
const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews,
    };
};

    //add review
const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    };
};

     //delete review
const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId,
    };
};




//REVIEWS THUNK ACTIONS

    //get all reviews

export const fetchReviews = (spotId) => async (dispatch) => {
    console.log( "in fetchREVIEWS THUNK<<<<<<<<")
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    
    if (response.ok) {
        const payload = await response.json();
        dispatch(getReviews(payload.Reviews));
        return payload;
    } 
}; 
    //add review

export const fetchAddReview = (reviewData) => async (dispatch) => {
    let {spotId, review, stars} =reviewData;
    spotId = Number(spotId.spotId);

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({review, stars})
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
    } 
}; 
    //delete review

export const fetchDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(data));
    } 
}; 


//REVIEWS REDUCER
const initialState = {};

const reviewReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEWS:
        console.log(action.payload, "get reviews payload")
        action.payload.forEach(review => {
            newState[review.id] = review;
        })
        return newState;
    case ADD_REVIEW:
        console.log(action.payload, "in REVIEW Reducer>>>>ADDREVIEW<<<<<<<<")
        newState = {...state, [action.payload.id]: action.payload}
        return newState;
    case DELETE_REVIEW:
        newState = {...state};
        delete newState[action.payload.reviewId]
        return newState;    
    default:
        return state;
    }
};
    
export default reviewReducer;