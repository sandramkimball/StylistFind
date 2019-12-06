import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import styled from 'styled-components';
// import {useDataContext} from '../contexts/DataContext';
// import {useUserContext} from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import Posts from '../posts/Posts';



export default function StylistDash(props) {
    const [stylist, setStylist] = useState([]);

    const openAddPost = e => {
        e.preventDefault();
        console.log('Will open add post form.')
    }
    
    useEffect(()=>{
        const id = props.match.params.id;
        axiosWithAuth()
        .get(`/stylists/profile/${id}`)
        .then(res=> { 
            console.log('Stylist Data: ', res.data);
            setStylist(res.data['0']);
        })
        .catch(err=>{console.log('SKSKRR ERROR: ', err)});
    }, [])

    return (
        <div>
            <h1>{stylist.first_name} {stylist.last_name}</h1>
            <section className = 'about-me'>
                <InfoBox>
                    <div>
                        <img src={`${stylist.profile_img}`} alt='profile of stylist, salon'/>
                    </div>
                    <div className='profile-text'>
                        <h3>{stylist.salon}</h3>
                        <h3>{stylist.bio}</h3>
                        <div className='address'>
                            <p>{stylist.email}</p>
                            <p>{stylist.salon}</p>
                            <p>{stylist.street_address}</p>
                            <p>{stylist.city}, {stylist.state} {stylist.zipcode}</p>
                        </div>
                        {/* {'usertype' === 'stlyist' &&(
                        <NavLink to='/edit-bio'>
                            <p className='edit-btn'>Edit</p>
                        </NavLink>)} */}
                    </div>
                </InfoBox>                
            </section>
            <section className = 'gallery'>
                <Gallery>
                    <p className='open-btn' onClick={openAddPost}>Add Post</p>
                    <div>
                        <Posts key={stylist.id} id={stylist.id} stylist={stylist}/>
                    </div>
                </Gallery>
            </section>
        </div>
    )
}

const InfoBox = styled.div`
    border-bottom: 1px solid #80808075;
    text-align: left;
    padding: 20px;
    width: 85%;
    height: 40vh;
    margin: 20px auto;
    display: flex;
    a{text-decoration: none;}
    img{
        height: 100%;
        width: 30vw;
        object-fit: cover;
        margin-right: 20px;
    }
    .profile-text{
        align-items: center;
        font-size: 1.2rem;
        div p{
            font-size: 1rem;
            margin: 2px 0;
            color: gray;
        }
    }
    .edit-btn{
        color: #80808075;
        :hover{color: #000}
    }
`;

const Gallery = styled.div`
    width: 90%;
    margin: 0 auto;
    h3{ align-text: center}
    div{
        display: flex;
        flex-wrap: wrap; 
    }
    .open-btn{
        background: white;
        max-width: 100px;
        border: 1px solid black;
        font-size: 1rem;
        height: 1.5rem;
        :hover{
            transform: scale(1.025); 
            border: 1px solid #80808075;
            color: #80808075;
            cursor: pointer;
    }
`;


