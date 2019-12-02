import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import styled from 'styled-components';


//COMPONENTS
// import {useDataContext} from '../contexts/DataContext';
// import {useUserContext} from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import AddImage from '../forms/AddImage';



export default function StylistDash(props) {
    const {savedStylist, setSavedStylist} = useState();
    const [stylist, setStylist] = useState([]);
    const [posts, setPosts] = useState([]);
    let id = props.id;
    const handleAddStylist = e => {
        setSavedStylist(e.target.value)
    }

    if(props.usertype === 'user'){
        const addStylist = savedStylist => {
            axiosWithAuth()
            .post(`/user/${props.user.id}/saved`, savedStylist)
            .then(res=> {
                // setItem('token', res.data.payload)
            })
            .catch(err=> console.log(err))
    }}
    
    const addImage = newImage => {
       axiosWithAuth(`/stylists/${props.id}`)
       .post(newImage)
       .then(res=> {
            localStorage.setItem('token', res.data.payload)
        })
        .catch(err=> console.log(err))
    }

    useEffect(()=>{
        axiosWithAuth()
        .get(`/stylists/profile/3`)
        .then(res=> { 
            console.log('Stylist Data: ', res.data);
            setStylist(res.data);
        })
        .catch(err=>{console.log('SKSKRR ERROR: ', err)});
    }, [])

    useEffect(()=>{
        axiosWithAuth()
        .get(`/stylists/profile/${id}/posts`)
        .then(res=> { 
            console.log('Posts Data: ', res.data);
            setPosts(res.data);
        })
        .catch(err=>{console.log('PHKHHK POST ERROR: ', err)});
    }, [])


    return (
        <div>
            <h1>{stylist.first_name} {stylist.last_name}</h1>
            <SaveButton>★</SaveButton>
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
                            <p>{stylist.city}</p>
                            <p>{stylist.state}</p>
                            <p>{stylist.zipcode}</p>
                            <p>{stylist.country}</p>
                        </div>
                        <NavLink to='/edit-bio'>
                            <p className='edit-btn'>Edit</p>
                        </NavLink>
                    </div>
                </InfoBox>                
            </section>
            <section className = 'gallery'>
                <Gallery>
                    <div> 
                        <AddImage/>
                    </div>  
                    <div>                    
                        {posts.map(post=> (
                            <GalleryImg>
                                <img src={`${post.image}`}/>
                                <p>{post.comment}</p>
                            </GalleryImg>
                        ))}
                    </div>
                </Gallery>
            </section>
        </div>
    )
}


const SaveButton = styled.button`
    border: none;
    background: none;
    color: gray;
    font-size: 3rem;
    :hover{ 
        color: gold;
        cursor: pointer;
    }
`;

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
    pading: 100px
    h3{ align-text: center}
    div{
        display: flex;
        flex-wrap: wrap; 
    }
    div:nth-child(1){
        justify-content: flex-end;
        margin: 10px;
    }
    img{
        margin: 5px;
        height: 300px;
        object-fit: cover;
        box-shadow: .5px 1px 3px black;
    }
`;

const GalleryImg = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 0;
    box-shadow: .5px 1px 3px black;
    min-height: 300px;
    img{
        object-fit: cover;
        margin-bottom: 0;
    }
    p{
        font-size: 1.125rem
        text-align: left; 
        padding: 5px;
    }
`;
