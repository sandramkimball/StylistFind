import React from 'react';
import styled from 'styled-components';

function ReviewCard (props) {
    const {image, username, stylist, review, date, salon} = props.userReview;


    return (
        <div>
            <Card>
                <h4>{review}</h4>
                <p>{date} {stylist}</p>
                <p>by {username}</p>
                {/* <img src={image}/> */}
            </Card>
        </div>
    )
}


const Card = styled.div`
    max-width: 360px;
    max-height: 425px;
    border: 1px solid purple
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 0 0 4px 0;
    box-shadow: 0px 1px 2px black;
    img{
        object-fit: cover;
        width: 350px;
        height: 250px;
        margin: 0 0;
    }
`;

export default ReviewCard;