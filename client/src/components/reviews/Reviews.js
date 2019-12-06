import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCards';
import axiosWithAuth from '../utilis/axiosWithAuth';

const Reviews = props => {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        const id = 1;
        axiosWithAuth()
        .get(`/search/reviews`)
        .then(res=> { 
            console.log('Review: ', res.data);
            setReviews(res.data.filter(review=> {
                return (review.user_id === id)
            }));
        })
        .catch(err=>{console.log('GHH REVIEW ERROR: ', err)
        });
    }, [])

    return (
        <div>
            <ReviewList>
                {reviews.map(review=> (
                    <ReviewCard key={review.id} review={review}/>
                ))}
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