import React from 'react';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';
import {useUserContext} from '../contexts/UserContext';
import ReviewCard from './ReviewCards';


const Reviews = props => {
    const { user, dispatch } = useUserContext();

    return (
        <div>
            <ReviewList>
                <p>Faux Review</p>>
                {/* {props.reviews.map(item=> (
                    <ReviewCard item={item}/>
                ))} */}
            </ReviewList>
        </div>
    )
}

export default Reviews;

const ReviewList = styled.div`
    width: 80%;
    margin: 10vh auto;
    text-align: left;
    border: 1px solid gray;
    p{height: 250px; width: 200px; border: 1px solid purple}
`;