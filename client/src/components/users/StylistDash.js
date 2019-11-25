import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import styled from 'styled-components';


//COMPONENTS
import {useDataContext} from '../contexts/DataContext';
import {useUserContext} from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import AddImage from '../forms/AddImage';



export default function StylistDash(props) {
    const {savedStylist, setSavedStylist} = useState();
    const {stylist, setStylist} = useState();
    // const stylist = props.stylist.find(
    //     item => item.id === Number(props.match.params.dataID)
    // ); 
    
    const handleAddStylist = e => {
        setSavedStylist(e.target.value)
    }

    if(props.usertype === 'user'){
        let storage = props.res.headers.authorization;
        const addStylist = savedStylist => {
            axiosWithAuth()
            .post(`/api/user/${props.user.id}/saved`, savedStylist)
            .then(res=> {
                storage.setItem('token', res.data.payload)
            })
            .catch(err=> console.log(err))
        }
    }
    
    const addImage = newImage => {
        localStorage().post(`/api/stylist-dash/${stylist.id}`, newImage)
        .then(res=> {
            localStorage.setItem('token', res.data.payload)
        })
        .catch(err=> console.log(err))
    }

    useEffect(()=>{
        axiosWithAuth()
        .get(`/api/stylists/${props.id}`)
        .then(res=> { console.log(res.data);
            setStylist(res.data)
        })
        .catch(err=>{console.log(err.response)});
    }, [])


    return (
        <div>
            <h1>Stylist Profile</h1>

            <SaveButton>
                Save Stylist
            </SaveButton>

            <section className = 'about-me'>
                <InfoBox>
                    <div>
                        <img src={`${stylist.profile_img}`} alt='profile of stylist, shop'/>
                    </div>
                    <div className='profile-text'>
                        <h3>{stylist.salon}</h3>
                        <h3>{stylist.name}</h3>
                        <div className = 'address'>
                            <p>{stylist.street_address}</p>
                            <p>{stylist.city}</p>
                            <p>{stylist.state}</p>
                            <p>{stylist.zipcode}</p>
                            <p>{stylist.country}</p>
                        </div>
                        <p>{stylist.bio}</p>

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
                        {stylist.map(stylist=> (
                            <GalleryImg>
                                <img src={`${stylist.image}`}/>
                            </GalleryImg>
                        ))}
                    </div>
                </Gallery>
            </section>
        </div>
    )
}


const SaveButton = styled.button`
    background: white;
    border: 1px solid black;
    font-size: 1.2rem;
    padding: 10px 15px;
    :hover{
        transform: scale(1.025); 
        border: 1px solid #80808075;
        color: #80808075;
    }
`;

const InfoBox = styled.div`
    border-bottom: 1px solid #80808075;
    text-align: left;
    padding: 20px;
    width: 85%;
    height: 500px;
    margin: 20px auto;
    display: flex;
    img{
        height: 100%;
        object-fit: cover;
        margin-right: 20px;

    }
    div:nth-child(1){
    }
    .profile-text{
        align-items: center;
    }
    p{ font-size: 1.2rem}
    .edit-btn{
        color: #80808075;
        :hover{transform: scale(1.025)}
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
img{
    margin: 5px;
    height: 300px;
    object-fit: cover;
    box-shadow: .5px 1px 3px black;
}
`;
