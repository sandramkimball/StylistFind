import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

function PostCard(props) {
    const {image, comment, date, id, stylist_id} = props.post;
    const {first_name, salon} = props.stylist;
    let stylistId = localStorage.getItem('id')
    const handleClick = e => {
        e.preventDefault()
        axiosWithAuth()
        .delete(`/${stylistId}/posts/${id}`)
        .then(res=> console.log('post deleted', res))
        .catch(err=> console.log('post not deleted', err))

    }

    return (
        <div>
            <Card className='post-card'>
                {stylistId === stylist_id &&(
                    <p className='delete-btn' onClick={handleClick}>X</p>
                )}
                <Link to={`/stylists/${id}/portfolio`} key={props.id} id={props.id} props={props}>
                    <img src={image} alt='user post'/>
                    <p>posted by {first_name}</p>
                    <p>{salon}</p>
                    <h4>{comment}</h4>
                    <p>{date}</p>
                </Link>
           </Card>
        </div>
    )
}

export default PostCard;

const Card = Styled.div`
    width: 17vw;
    height: 25vw;
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
        width: 100%;
        height: 15vw;
        margin: 0 auto;
        padding: none;
    }
    h4{font-size: 1rem; margin: 0; padding: 0 4px;}
    p{font-size: .85rem; margin: 0;  padding: 0 5px;}
    .delete-btn{
        text-align: right;
        color: gray;
        cursor: pointer;
        size: 1rem;
        :hover{
            color: orange
        }
    }
`;