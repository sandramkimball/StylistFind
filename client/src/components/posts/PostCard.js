import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

function PostCard(props) {
    const {image, comment, date, id} = props.post;
    const {username, salon} = props.stylist;

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
    height: 400px;
    background: #fff;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 0 4px 0;
    border-radius: 4px;
    box-sizing: border-box;
    background: #fff;
    a{text-decoration: none; color: #000}
    img{
        object-fit: cover;
        width: 310px;
        height: 310px;
        margin: 0 auto;
        padding: none;
    }
    h4{font-size: 1rem; margin: 0; padding: 0 4px;}
    p{font-size: .85rem; margin: 0;  padding: 0 5px;}
`;