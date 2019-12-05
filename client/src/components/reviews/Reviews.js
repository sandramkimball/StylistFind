import React from 'react';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';
import {useUserContext} from '../contexts/UserContext';
import ReviewCard from './ReviewCards';


const Reviews = props => {
    const { user, dispatch } = useUserContext();

    return (
        <div>
            <ReviewForm/>
            <ReviewList>
            <h1>Reviews</h1>
            <ul>
                <li>Review:</li>
                <li>Review:</li>
                {props.reviews.map(item=> (
                    <ReviewCard item={item}/>
                ))}
            </ul>
        </ReviewList>
        </div>
    )
}

export default Reviews;

const ReviewList = styled.div`
    width: 80%;
    max-height: 30%;
    margin: 50px auto;
    text-align: left;
    ul li{
        padding: 10px;
        border-bottom: 1.5px solid gray;
        list-style-type: none
    }
`;