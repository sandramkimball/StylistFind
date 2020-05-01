import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import PostCard from '../posts/PostCard';
import defaultImg from '../../images/default-profile.jpg'
import Toolbar from './Toolbar'

class StylistDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stylist: [],
            salon: [],
            posts: [],
        }
    }
    
    componentDidMount(){
        console.log(localStorage)
        const id = localStorage.getItem('id')    
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .get(`/stylists/${id}`, token)
        .then(res=> { 
            this.setState({ stylist: res.data });
            return axiosWithAuth()
            .get(`/stylists/${id}/posts`, token)
            .then(res=> { 
                this.setState({ posts: res.data });
            })
        })
        .catch(err=>{console.log(err, err.message)});
    }


    render(){
        const hasProfileImage = this.state.stylist.profile_image;
        let profile_image
        let default_image;
        if(!hasProfileImage === null){
            profile_image = <img src={`${this.stylist.user.profile_img}`} alt='profile of stylist'/>
        }
        else{default_image = <img src={defaultImg} alt='default avatar'/>}

        return (
            <Dash className='stylist-dash'>
                <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
                <InfoBox className='info-box'>
                    <Toolbar stylist={this.state.stylist} isAdded={this.state.isAdded}/>
                    <div className='profile-pic-box'>
                        {profile_image}
                        {default_image}
                    </div>
                    <div className='profile-text'>
                        <h1>{this.state.stylist.first_name} {this.state.stylist.last_name}</h1> 
                        <h3>{this.state.stylist.salon}</h3>
                        <h3>{this.state.stylist.bio}</h3>
                        <div className='address'>
                            <p>{this.state.stylist.email}</p>
                            <p>{this.state.stylist.salon}</p>
                            <p>{this.state.stylist.street_address}</p>
                            <p>{this.state.stylist.city} {this.state.stylist.state} {this.state.stylist.zipcode}</p>
                        </div>
                    </div>
               
                </InfoBox>    
                <div className = 'gallery'>
                    <h4>Your Posts</h4>
                    <Link to='/stylist/:id/add-post'>+Post</Link>
                    <div>
                        {this.state.posts.map(post=> (
                            <PostCard 
                                key={post.id}
                                id={post.id} 
                                post={post}
                                stylist={this.state.stylist}
                            />
                        ))}
                    </div>                        
                </div>
            </Dash>
        )
    }
}

export default StylistDash;

const Dash = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
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


