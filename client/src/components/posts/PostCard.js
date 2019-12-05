import React from 'react';
import Styled from 'styled-components';

const PostCard = (props) => {
    return (
        <div>
            <Card>
                <h4>{props.username}</h4>
                <p>{props.date}</p>
                <p>at {props.salon}</p>
                <img src={`${props.image}`}/>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 0;
    box-shadow: .5px 1px 3px black;
    min-height: 300px;
    img{
        object-fit: cover;
        margin-bottom: 0;
    }
    p{
        font-size: 1.125rem
        text-align: left; 
        padding: 5px;
    }
`;