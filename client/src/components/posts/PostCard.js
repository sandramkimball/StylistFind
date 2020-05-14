import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

function PostCard(props) {
    const {image, comment, date, id, stylist_id} = props.post;
    const {first_name, salon} = props.stylist;
    let stylistId = localStorage.getItem('id')
    let isStylist = localStorage.getItem('usertype')

    const handleClick = e => {
        e.preventDefault()
        axiosWithAuth()
        .delete(`/${stylistId}/posts/${id}`)
        .then(res=> console.log('post deleted', res))
        .catch(err=> console.log('post not deleted', err))

    }

    return (
        <Card className='post-card'>
            {isStylist === "stylist" && stylistId === stylist_id &&(
                <button className='delete-btn' onClick={handleClick}>X</button>
            )}
            <Link to={`/stylists/${id}/portfolio`} key={props.id} id={props.id} props={props}>
                {image && (<img src={image} alt='user post'/>)}
                <p>posted by {first_name}</p>
                <h4>{comment}</h4>
            </Link>
        </Card>
    )
}

export default PostCard;

const Card = Styled.div`
    height: 28vw;
    width: 25vw;
    background: #fff;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 0 4px 0;
    border-radius: 4px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    a{text-decoration: none; color: #000}
    img{
        height: 20vw;
        width: 100%;
        object-fit: cover;
        margin-right: 10px;
    }
    h4{
        font-size: .85rem; 
        margin: 0; 
        padding: 5px
    }
    p{
        font-size: .85rem; 
        margin: 0; 
        padding: 5px; 
        color: gray
    }
    .delete-btn{
        position: absolute;
        right: 0;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 700;
        z-index: 10;
        :hover{
            color: orange
        }
    }
`;