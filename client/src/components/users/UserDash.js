import React from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import ReviewCard from '../reviews/ReviewCards';
import defaultImg from '../../images/default-profile.jpg';
import {Link} from 'react-router-dom';

class UserDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            reviews: [],
            bookmarks: []
        }
    }
    
    componentDidMount(){
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .get(`/users/${id}`, token)
        .then(res=> { 
            this.setState({user: res.data})
            return axiosWithAuth()
            .get(`users/${id}/reviews`, token)
            .then(res=> {
                this.setState({reviews: res.data})
            })
        })
        .catch(err=>{console.log(err.response)});
    }


    render(){
        const hasProfileImage = this.state.user.profile_image;
        let profile_image
        let default_image;
        if(!hasProfileImage === null){
            profile_image = <img src={`${this.state.user.profile_img}`} alt='profile of user'/>
        }
        else{default_image = <img src={defaultImg} alt='default avatar'/>}

        return (
            <Dash>
                <InfoBox>
                    <div className='profile-pic-box'>
                        {profile_image}
                        {default_image}
                    </div>
                    <div className='profile-text'>
                        <h1>{this.state.user.first_name}</h1> 
                        <p>{this.state.user.email}</p> 
                    </div>
                    <Link to={`/user/${this.state.user.id}/edit`}><p className='edit-btn'>Edit</p></Link>
                </InfoBox>    
                <div className = 'gallery'>
                    <h4>Your Reviews</h4>
                    <div>
                        {this.state.reviews !== null && this.state.reviews.map(review => (
                            <ReviewCard  
                                key={review.id}
                                id={review.id} 
                                review={review}/>
                        ))}
                        {this.state.reviews === null && (
                            <p>You have no reviews</p>
                        )}
                        
                    </div>
                </div>
                <div className='bookmarks'>
                    <h4>Your Favorites</h4>
                    <div>
                        {this.state.bookmarks && this.state.bookmarks.map(review => (
                            <p>Stylist Name</p>
                        ))}
                        {!this.state.bookmarks && (
                            <p>You have nothing saved.</p>
                        )}
                    </div>
                </div>
            </Dash>
        )
    }
}

export default UserDash;

const Dash = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: space-between;
    a{text-decoration: none}
    .gallery, .bookmarks{ 
        background: white;
        box-shadow: 0px 3px 8px gray;
        border-radius: 4px;
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
    height: 50vh;
    padding: 10px 5px;
    margin: auto;
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


