import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

function PostCard(props) {
    const {image, username, comment, date, id, salon} = props.post;

    return (
        <div>
            <Card>
                <Link to={`/stylists/${id}/dash`} key={props.id} id={props.id} props={props}>
                    <img src={image} alt='user post'/>
                    <p>posted by {username} {salon}</p>
                    <h4>{comment}</h4>
                    <p>{date}</p>
                </Link>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    width: 310px;
    height: 350px;
    background: #fff;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 0 4px 0;
    border-radius: 4px;
    box-sizing: border-box;
    a{text-decoration: none; color: #000}
    img{
        object-fit: cover;
        width: 300px;
        height: 300px;
        margin: 0 0;
    }
    h4{font-size: 1rem; margin: 0; padding: 0 4px;}
    p{font-size: .85rem; margin: 0;  padding: 0 5px;}
`;