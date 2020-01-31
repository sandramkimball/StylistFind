import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import ReviewCards from '../reviews/ReviewCards';

class UserDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            reviews: [],
        }
        this.openAddPost = this.openAddPost.bind(this);
    }
    
    openAddPost = e => {
        e.preventDefault();
        console.log('Will open add post form.')
    }
    
    componentDidMount(props){
        let id = 1;
        axiosWithAuth()
        .get(`/users/${id}`)
        .then(res=> { 
            this.setState({user: res.data})
        })

        return axiosWithAuth()
        .get(`users/${id}/reviews`)
        .then(res=> {
            this.setState({reviews: res.data})
        })
        .catch(err=>{console.log('Error fetching Reviews', err.response)});
    }


    render(){
        console.log('User Data', this.state.user)
        console.log('User Reviews', this.state.reviews)
        return (
            <Dash>
                <InfoBox>
                    <div className='profile-pic-box'>
                        <img src={`${this.state.user.profile_img}`} alt='profile of user'/>
                    </div>
                    <div className='profile-text'>
                        <h1>{this.state.user.username}</h1> 
                        <p>{this.state.user.email}</p> 
                    </div>
                </InfoBox>    
                <section className = 'gallery'>
                    <Gallery>
                        <p className='open-btn' onClick={this.openAddPost}>+</p>
                        <div>
                            {this.state.reviews.map(review => (
                                <ReviewCards  
                                    id={review.id} 
                                    review={review}/>
                            ))}
                            
                        </div>
                    </Gallery>
                </section>
            </Dash>
        )
    }
}

export default UserDash;

const Dash = styled.div`
    display: flex;
    margin: auto;
    justify-content: space-between;
    a{text-decoration: none}
`;

const InfoBox = styled.div`
    border: 1px solid #80808075;
    width: 20vw;
    height: 60vh;
    padding: 10px 5px;
    margin: 5% auto;
    text-align: left;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    p{padding: 0; margin: 0}
    .profile-pic-box{
        height: 200px;
        width: 200px;
        margin: auto;
        border-radius: 50%;
        border: 1px solid purple
        img{
            height: 200px;
            width: 200px;
            border-radius: 50%;
            object-fit: cover;
        }
    }    
    .profile-text{
        margin: 2px auto;
    }
    .edit-btn{
        color: #80808075;
        :hover{color: #000}
    }
`;

const Gallery = styled.div`
    width: 75vw;
    margin: 0 auto;
    div{
        display: flex;
        flex-wrap: wrap; 
        margin: 0 auto;
    }
    .open-btn{
        color: gray;
        font-size: 3.25rem;
        position: fixed;
        bottom: 0px;
        right: 10%;
        z-index: 10;
        cursor: pointer;
        :hover{
            color: #80808075;
            .add-p{display: inherit}
    }
`;


