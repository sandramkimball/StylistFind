import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, NavLink} from 'react-router-dom';
import styled from 'styled-components';

//COMPONENTS
import {useDataContext} from '../contexts/DataContext';
import SavedCard from './SavedStylists';


export default function CustomerDash() {
    const { data, dispatchData } = useDataContext();

    useEffect(()=>{
        axiosWithAuth()
        .get(`/api/users/${id}`)
        .then(res=> { 
            console.log(res.data);
            setCustomer(res.data)
        })
        .catch(err=>{console.log(err.response)});
    }, [])

    useEffect(()=> {
        const userId = (props.match.params.id);
        const userData = data.users.find(el => el.id === userId);
        dispatchData({type: 'SET_USER', payload: userData})
    }, [])

    // if (customer.usertype !=== 'user' || 'stylist'){ 
    //     return (<Redirect to='/login'></Redirect> )
    // }

    return (
        <div>
        <h1>Customer Dashboard</h1>
        <section className = 'about-me'>
            <InfoBox>
                <div>
                    <img alt='stylist profile' src={user.profile_img}/>
                </div>
                <div className='profile-text'>
                    <h3>{user.name}</h3>
                    <NavLink to='edit-profile' className='edit-btn' >Edit</NavLink>
                </div>
            </InfoBox>                
        </section>

        <Saved>
            <h3>Your Saved Stylists</h3>
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
    border-bottom: 1px solid #80808075;
    text-align: left;
    padding: 20px;
    width: 85%;
    height: 400px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    align-content: center;

    img{
        height: 300px;
        width: 300px;
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



// const initialBio = {
//     name: '',
//     savedStylists: [],
//     imageUrl: '',
//     address: '',
//     email: '',
//     id: '',
// }
// const handleDelete = (id) => {
    //     axiosWithAuth()
    //     .delete(`/api/${stylist.id}`).then(res=> {
    //       this.props.updateStylist(res.data);
    //       this.props.history.push('/customer-dash');
    //     }) .catch(err=> console.log('Not deleted:', err.response))
    //   };