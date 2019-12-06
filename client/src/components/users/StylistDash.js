import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import styled from 'styled-components';
// import {useDataContext} from '../contexts/DataContext';
// import {useUserContext} from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import Posts from '../posts/Posts';
import AddPost from '../forms/AddPost';



export default function StylistDash(props) {
    const [stylist, setStylist] = useState([]);
    
    useEffect(()=>{
        const id = props.id;
        axiosWithAuth()
        .get(`/stylists/profile/${id}`)
        .then(res=> { 
            console.log('Stylist Data: ', res.data);
            setStylist(res.data)
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
                    <AddPost/>
                    <div>
                        <Posts key={props.id} props={props}/>
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
    div:nth-child(1){
    }
    .profile-text{
        align-items: center;
        font-size: 2rem;
    }
    .address{
        font-size: 1.5rem;
        padding-top: 10px;
        border-top: 1px solid gray;
    }
    p{ font-size: 1.125rem}
    .edit-btn{
        color: #80808075;
        :hover{color: #000}
    }
`;

const Gallery = styled.div`
    width: 85%;
    margin: 0 auto;
    h3{ align-text: center}
    div{
        display: flex;
        flex-wrap: wrap; 
    }
    img{
        margin: 5px;
        height: 300px;
        object-fit: cover;
        box-shadow: .5px 1px 3px black;
    }
`;


