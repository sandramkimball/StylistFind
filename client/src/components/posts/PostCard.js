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
                    <h4>{comment}</h4>
                    <p>{date} at ... by {username}</p>
                </Link>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    max-width: 310px;
    height: 350px;
    background: #fff;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 5px;
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
    h4{font-size: 1.025rem; margin: 0 0; padding: 0 4px;}
    p{font-size: 1rem; margin: 0 0;  padding: 0 5px;}
`;