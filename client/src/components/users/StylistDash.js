import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import styled from 'styled-components';
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
            <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
            <section className = 'about-me'>
                <InfoBox>
                    <div className='profile-pic-box'>
                        <img src={`${stylist.profile_img}`} alt='profile of stylist, salon'/>
                        <h1>{stylist.first_name} {stylist.last_name}</h1>
                        <i class="fas fa-star"></i>
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
                    </div>
                </InfoBox>                
            </section>
            <section className = 'gallery'>
                <Gallery>
                    <p className='open-btn' onClick={openAddPost}>+</p>
                    <div>
                        <Posts key={stylist.id} id={stylist.id} stylist={stylist}/>
                    </div>
                </Gallery>
            </section>
        </div>
    )
}

const InfoBox = styled.div`
    border: 1px solid #80808075;
    text-align: left;
    padding: 5px;
    width: 70vw;
    height: 40vh;
    margin: 20px auto;
    display: flex;
    a{text-decoration: none;}
    .profile-pic-box{
        height: 100%;
        width: 30vw;
        margin-right: 20px;
        text-align: center;
        border: 1px solid purple
        img{
            height: 15vw;
            width: 15vw;
            object-fit: cover;
        }
    }    
    .profile-text{
        align-items: center;
        font-size: 1.2rem;
        p{
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
    div{
        display: flex;
        flex-wrap: wrap; 
        margin: 0;
    }
    .open-btn{
        color: gray;
        font-size: 3rem;
        text-align: center;
        margin: 0;
        padding: 0;
        :hover{
            color: #80808075;
            cursor: pointer;
    }
`;


