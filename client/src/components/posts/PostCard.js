import React from 'react';
import Styled from 'styled-components';

const PostCard = (post) => {
    return (
        <div>
            <Card>
                <h4>{post.username}</h4>
                <p>{post.date}</p>
                <p>at {post.salon}</p>
                <p>{post.comment}</p>
                <img src={post.image}/>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 5px;
    padding: 0;
    box-shadow: .5px 1px 3px black;
    border-radius: 4px;
    img{
        object-fit: cover;
        margin-bottom: 0;
    }
    h4{font-size: 1.5rem}
    p{
        font-size: 1.25rem
        text-align: left; 
        padding: 5px;
    }
`;