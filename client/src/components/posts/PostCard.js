import React from 'react';
import Styled from 'styled-components';

function PostCard(props) {
    const {image, username, comment, date, salon} = props.post;

    return (
        <div>
            <Card>
                <img src={image}/>
                <h4>{comment}</h4>
                <p>{date} {salon}</p>
                <p>by {username}</p>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    max-width: 310px;
    max-height: 450px;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 5px;
    padding: 0 0 4px 0;
    box-shadow: .5px 1px 2px black;
    border-radius: 4px;
    box-sizing: border-box;
    img{
        object-fit: cover;
        width: 300px;
        height: 300px;
        margin: 0 0;
    }
    h4{font-size: 1.025rem; margin: 0 0; padding: 0 4px;}
    p{font-size: 1rem; margin: 0 0;  padding: 0 5px;}
`;