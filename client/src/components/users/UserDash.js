import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import ReviewCard from '../reviews/ReviewCards';
import defaultImg from '../../images/default-profile.jpg';
import {Link} from 'react-router-dom';

const UserDash = () => {
    const [user, setUser] = useContext(UserContext)
    const [reviews, setReviews] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .get(`/users/${user.id}/reviews`, token)
        .then(res=> { 
            setReviews(res.data)
            return axiosWithAuth()
            .get(`users/${user.id}/bookmarks`, token)
            .then(res=> setBookmarks(res.data) )
        })
        .catch(err => console.log(err.response) );
    }, [])


    return (
        <Dash>                   
            <InfoBox>
                <div className='profile-pic-box'>
                    {user.profile_img !== null &&(
                        <img src={`${user.profile_img}`} alt='profile of user'/>
                    )}
                    {user.profile_img === null && (
                        <img src={defaultImg} alt='default avatar'/>
                    )}
                </div>
                <div className='profile-text'>
                    <h1>{user.first_name}</h1> 
                    <p>{user.email}</p> 
                </div>
                <Link to={`/user/${user.id}/edit`}><p className='edit-btn'>Edit</p></Link>
            </InfoBox>    
            <div className='reviews'>
                <h4>Your Reviews</h4>
                <div>
                    {reviews && reviews.map(review => (
                        <ReviewCard  
                            key={review.id}
                            id={review.id} 
                            review={review}/>
                    ))}
                    {reviews === null && (
                        <p>You have no reviews</p>
                    )}
                    
                </div>
            </div>
            <div className='bookmarks'>
                <h4>Your Favorites</h4>
                <div>
                    {bookmarks && bookmarks.map(review => (
                        <p>Stylist Name</p>
                    ))}
                    {!bookmarks && (
                        <p>You have nothing saved.</p>
                    )}
                </div>
            </div>
        </Dash>  
    )
}

export default UserDash;

const Dash = styled.section`
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: space-between;
    a{text-decoration: none}
    .reviews, .bookmarks{ 
        background: white;
        box-shadow: 0px 3px 8px gray;
        border-radius: 4px;
        width: 70vw;
        height: 100%;
        margin: 5vh auto;
        div{
            display: flex;
            margin: 0 1px 2px 1px;
        }
    }
`;

const InfoBox = styled.div`
    background: white;
    box-shadow: 0px 3px 8px gray;
    border-radius: 4px;
    width: 70vw;
    height: 50vh;
    padding: 10px 5px;
    margin: auto;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    p{
        padding: 0; 
        margin: 0
    }
    .profile-pic-box{
        height: 200px;
        width: 200px;
        margin: 0 auto;
        border-radius: 50%;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }    
    .profile-text{
        margin: 2px auto;
        width: 70%;
    }
`;


