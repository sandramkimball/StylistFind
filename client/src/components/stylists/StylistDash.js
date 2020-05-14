import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import PostCard from '../posts/PostCard';
import defaultImg from '../../images/default-profile.jpg'
import Toolbar from './Toolbar'

const StylistDash = () =>  {
    const [stylist, setStylist] = useContext(UserContext)
    const [user, setUser] = useContext(UserContext)
    const [salon, setSalon] = useState([])
    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [isSaved, setIsSaved] = useState('')
    
    useEffect(()=>{
        console.log(localStorage)
        const id = localStorage.getItem('id')    
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .get(`/stylists/${id}`, token)
        .then(res=> { 
            setStylist(res.data);
            return axiosWithAuth()
            .get(`/stylists/${id}/posts`, token)
            .then(res=> { 
                setPosts(res.data);
            })
        })
        .catch(err=>{console.log(err, err.message)});
    }, [])

  
    return (
        <Dash className='stylist-dash'>
            <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
            <InfoBox className='info-box'>
                <Toolbar stylist={stylist} isSaved={isSaved}/>
                <div className='profile-pic-box'>
                    {user.profile_img !== null &&(
                        <img src={`${user.profile_img}`} alt='profile of user'/>
                    )}
                    {user.profile_img === null && (
                        <img src={defaultImg} alt='default avatar'/>
                    )}
                </div>
                <div className='profile-text'>
                    <h1>{stylist.first_name} {stylist.last_name}</h1> 
                    <h3>{stylist.salon}</h3>
                    <h3>{stylist.bio}</h3>
                    <div className='address'>
                        <p>{stylist.email}</p>
                        <p>{stylist.salon}</p>
                        <p>{stylist.street_address}</p>
                        <p>{stylist.city} {stylist.state} {stylist.zipcode}</p>
                    </div>
                </div>
            
            </InfoBox>    
            <div className = 'gallery'>
                <h4>Feed</h4>
                <Link to='/stylist/:id/add-post'>+Post</Link>
                <div>
                    {posts.map(post=> (
                        <PostCard 
                            key={post.id}
                            id={post.id} 
                            post={post}
                            stylist={stylist}
                        />
                    ))}
                </div>                        
            </div>
        </Dash>
    )
}

export default StylistDash;

const Dash = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: space-between;
    a{text-decoration: none}
    .gallery{ 
        width: 70vw;
        height: 100%;
        margin: 5vh auto;
        div{
            display: flex;
            flex-wrap: wrap; 
            margin: 0 1px 2px 1px;
        }
    }
`;

const InfoBox = styled.div`
    background: white;
    box-shadow: 0px 3px 8px gray;
    border-radius: 4px;
    width: 70vw;
    height: 60vh;
    padding: 10px 5px;
    margin: 0 auto;
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


