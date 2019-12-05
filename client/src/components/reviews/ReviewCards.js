import React from 'react';
import styled from 'styled-components';

const ReviewCard = (props) => {

    var ImageStack = (props) => {
        
    };

    return (
        <div>
            <Card>
                <h4>{props.username}</h4>
                <h5>{props.stylist}</h5>
                <h5>at {props.salon}</h5>
                <p>{props.date}</p>
                <p>Comment</p>
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