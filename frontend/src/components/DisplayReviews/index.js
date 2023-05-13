import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from "../../store/reviews";
import "./DisplayReviews.css";

function DisplayReviews ({review}) {
    const user = useSelector(state => state.session.user);
    console.log(user, "user DETAILS")

    const reviews = useSelector(state => Object.values(state.reviews));
    console.log(reviews, "reviews DETAILS")

    const monthCreated = review.createdAt.slice(5,6);
    const monthsObj= {
        '01':"January",
        '02':"February",
        '03':"March",
        '04':"April",
        '05':"May",
        '06':"June",
        '07':"July",
        '08':"August",
        '09':"September",
        '10':"October",
        '11':"November",
        '12':"December"
    };
    for (let month in monthsObj) {
        if (monthCreated == Number(month)){
            let stringMonth = monthsObj[month]
            
            console.log(stringMonth, "Month review created  in string format")
            return stringMonth
        }

    }
    const year = review.createdAt.slice(0,4);
    
}

export default DisplayReviews;