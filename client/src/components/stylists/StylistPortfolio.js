import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import PostCard from '../posts/PostCard';
import Toolbar from './Toolbar'

const StylistPortfolio = (props) =>  {
    // const [stylist, setStylist] = useContext(UserContext)
    const [stylist, setStylist] = useState([])
    const [user, setUser] = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [salon, setSalon] = useState([])
    const [reviews, setReviews] = useState([])

    function isSaved(user, stylist){
        return true
    }
    
    useEffect(()=>{
        const stylist_id = props.match.params.id;
        axiosWithAuth()
        .get(`/stylists/public/${stylist_id}`)
        .then(res=> { 
            setStylist(res.data);
            return axiosWithAuth()
            .get(`/stylists/${stylist_id}/posts`)
            .then(res=> { 
                setPosts(res.data);
            })
        })
        .catch(err=>{console.log(err, err.message)});
    }, [])


    return (
        <Dash className='stylist-dash'>
            <nav className='return-nav'>
                <Link to='/search'><button className='return-btn'>Return</button></Link>
            </nav>
            <InfoBox className='info-box'>
                <Toolbar stylist={stylist} isSaved={isSaved}/>
                <div className='profile-pic-box'>
                    <img src={`${stylist.profile_img}`} alt='profile of user'/>
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

export default StylistPortfolio;

const Dash = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 5vh;
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
    .return-nav{
        width: 100vw;
        margin-bottom: 5vh;
        border-bottom: 1px solid gray;
        background: #fff;
        padding: 5px 10px;
        text-align: left;
    }
    .return-btn{ 
        text-decoration: none;
        border: none;
        font-size: 1.25rem;
        background: none;
        color: gray
        :hover{cursor: pointer; color: orange}
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


