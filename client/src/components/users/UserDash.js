import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';


export default function UserDash(props) {
    const [userData, setUserData] = useState({});

    useEffect(()=>{
        axiosWithAuth()
        .get(`/users/3`)
        .then(res=> { 
            setUserData(res.data);
        })
        .catch(err=>{console.log(err.response)});
    }, [])

    console.log('USERDATA', userData);

    return (
        <div>
        <h1>Your Profile</h1>
        <section className = 'about-me'>
            <InfoBox>
                <div>
                    <img alt='user profile' src={userData.profile_img}/>
                </div>
                <div className='profile-text'>
                    <h3>{userData.name}</h3>
                    <h3>{userData.email}</h3>
                    <NavLink to='edit-profile' className='edit-btn'>Edit</NavLink>
                </div>
            </InfoBox>                
        </section>

        <Saved>
            <h3>Bookmarked</h3>
            <div>
                {/* {customer.saved_stylists.map(stylist=> (
                <SavedCard key={stylist.id} stylist={stylist}/>
                ))} */}
            </div>
        </Saved>
        </div>
    )
}

const InfoBox = styled.div`
    border: 1px solid #80808075;
    border-radius: 4px;
    text-align: left;
    padding: 20px;
    width: 85%;
    // height: 400px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    align-content: center;
    img{
        height: 250px;
        width: 250px;
        object-fit: cover;
        border-radius: 50%   
    }
    div:nth-child(1){
        width: 40%;
    }
    .profile-text{
        margin-top: 20px;
    }
    p{ font-size: 1.2rem}
    .edit-btn{
        color: #80808075;
        :hover{transform: scale(1.025)}
    }
`;

const Saved = styled.div`
    width: 85%;
    padding: 10px;
    margin: 0 auto;
    div{
        display: flex;
        justify-content: center;
    }    
`;



// const handleDelete = (id) => {
    //     axiosWithAuth()
    //     .delete(`/api/${stylist.id}`).then(res=> {
    //       this.props.updateStylist(res.data);
    //       this.props.history.push('/customer-dash');
    //     }) .catch(err=> console.log('Not deleted:', err.response))
    //   };