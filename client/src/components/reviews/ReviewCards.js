import React from 'react';
import styled from 'styled-components';

function ReviewCard (props) {
    const {image, username, stylist, review, date, salon} = props.userReview;


    return (
        <div>
            <Card>
                <h4>{review}</h4>
                <p>{date} {salon} by {username}</p>
                {/* <img src={image}/> */}
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 20vw;
    max-height: 425px;
    border-top: .5px solid gray;
    border-bottom: .5px solid gray;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    border-radius: 2px;
    padding: 0;
    margin: 0;
    h4, p{
        text-align: left;
        padding: 5px;
        margin: 0
    }
    img{
        object-fit: cover;
        width: 350px;
        height: 250px;
        margin: 0 0;
    }
`;

export default ReviewCard;