import React from 'react';
import styled from 'styled-components';

function ReviewCard (props) {
    const {image, username, stylist, review, date, salon} = props.review;


    return (
        <div>
            <Card>
                <h4>{review}</h4>
                <p>{date} {stylist}</p>
                <p>by {username}</p>
                <img src={image}/>
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 200px;
    border-radius: 4px;
    box-shadow: 0px 1px 1px black;
    display: flex;
    flex-direction: column;
    padding: 4px;
`;

export default ReviewCard;