import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axiosWithAuth from '../utilis/axiosWithAuth';


function ReviewCard (props) {
    const {id, image, review, date, profile_img, stylist_id, user_id, user_first, stylist_first, stylist_last} = props.review;
    const token = localStorage.getItem('token')
    let userId = localStorage.getItem('id')
    let isUser = localStorage.getItem('usertype')
    let newDate = date.split(' ')[0]

    const handleDelete = e => {
        axiosWithAuth()
        .delete(`/users/${user_id}/reviews/${id}`)
        .then(res=> 
            console.log('Successfully sent review delete request', res),
            window.location.reload()
        )
        .catch(err=> console.log('Failed to send review delete request', err))
    }

    return (
        <div>
            <Card>
                {isUser === "user" && userId == user_id &&(
                    <button className='delete-btn' onClick={handleDelete}>X</button>
                )}
                <div className='reviewer-info'>
                    <img src={profile_img} alt='user profile'/>
                    {localStorage.getItem('id') === user_id && (
                        <p className='delete-btn' onClick={handleDelete}>X</p>
                    )}
                    <div>
                        <h4>{user_first} </h4>
                        <p>
                            <Link to={`/stylists/${stylist_id}/portfolio`} key={stylist_id} id={stylist_id} props={props}>
                               <h4> @{stylist_first} {stylist_last}</h4>
                            </Link>    
                        </p>
                    </div>
                </div>
                <div className='review-text'>
                    <p>{review}</p>
                    {image && (
                        <img src={image} alt='review'/>
                    )}
                    <p>reviewed on {newDate}</p>
                </div>
            </Card>
        </div>
    )
}

export default ReviewCard;

const Card = styled.div`
    width: 70vw;
    border: .75px solid lightgray;
    border-radius: 4px;
    font-size: 1rem;
    padding-bottom: 5px;
    text-align: left; 
    position: relative;
    display: flex;
    background: #fff;
    margin: 10px auto;
    h4{ padding: 0; margin: 0}
    a{ 
        color: black; 
        text-decoration: underline, 
        font-weight: 400
    }
    .reviewer-info{
        height: 100%;
        width: 15vw;
        display: flex;
        flex-direction: flex-start;
        flex-direction: column; 
        div{
            flex-direction: column; 
            margin: 5px 0 0 5px
        }
        p{ 
            margin: 0;
            font-size: .75rem
        }
        img{
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin: 0;
        }
    }
    .review-text{
        margin: 10px;
        height: 100%;
        p{margin: 0
        :nth-last-child(1){
            color: gray;
            font-style: italic;
        }}
        img{
            height: 120px;
            object-fit: cover;
            margin: 5px
        }
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
