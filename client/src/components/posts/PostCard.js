import React from 'react';
import Styled from 'styled-components';

function PostCard(props) {
    const {image, username, comment, date, salon} = props.post;

    return (
        <div>
            <Card>
                <img src={image}/>
                <h4>by{username}</h4>
                <h4>{comment}</h4>
                <p>on {date} at {salon}</p>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    width: 300px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    margin: 5px;
    box-shadow: .5px 1px 3px black;
    border-radius: 4px;
    img{
        object-fit: cover;
        width: 100%;
        height: 70%;
        margin: 0;
        border: 1px solid green;
    }
    h4{font-size: 1.125rem; margin: 0}
    p{
        font-size: 1rem
        text-align: left; 
        margin: 0;
    }
`;