import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCards';
import axiosWithAuth from '../utilis/axiosWithAuth';

const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    setReviews(props);
    // console.log('REVIEWS.JS:', reviews )

    return (
        <div>
            <ReviewList>
                {/* {reviews.map(userReview=> (
                    <ReviewCard key={userReview.id} userReview={userReview}/>
                ))} */}
            </ReviewList>
        </div>
    )
}

export default Reviews;

const ReviewList = styled.div`
    width: 100%;
    margin: 10vh auto;
    text-align: left;
    border: 1px solid gray;
`;