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
        // const id = this.props.match.params.id 
        const id = localStorage.getItem('id')
        axiosWithAuth()
        .get(`/users/${id}`)
        .then(res=> { 
            this.setState({user: res.data})
            return axiosWithAuth()
            .get(`users/${id}/reviews`)
            .then(res=> {
                console.log(res.data)
                this.setState({reviews: res.data})
            })
        })
        .catch(err=>{console.log('Error fetching user data', err.response)});
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
                <section className = 'gallery'>
                    <Gallery>
                        <h4>Your Reviews</h4>
                        <div>
                            {this.state.reviews !== null && this.state.reviews.map(review => (
                                <ReviewCard  
                                    id={review.id} 
                                    review={review}/>
                            ))}
                            {this.state.reviews === null && (
                                <p>You have no reviews</p>
                            )}
                            
                        </div>
                    </Gallery>
                    <div className='bookmarked'>
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
    h4{font-family: "Dancing Script", sans-serif; font-size: 1.5rem}
    a{text-decoration: none}
    .gallery{ width: 75vw}
    .bookmarked{
        box-shadow: 0px 3px 8px gray;
        padding: 2px 4px;
        width: 90%;
        margin: 5vh auto;
        height: 35%;
        boder-radius: 2px
        background: #fff;
        div{
            display: flex;
            justify-content: center;
            flex-wrap: wrap; 
            margin: 0 auto;
        }
    }
    .gallery{
        overflow-y: scroll
    }
`;

const InfoBox = styled.div`
    background: white;
    box-shadow: 0px 3px 8px gray;
    border-radius: 4px;
    width: 20vw;
    height: 60vh;
    padding: 10px 5px;
    margin: 5% auto;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    p{padding: 0; margin: 0}
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
    }
    .edit-btn{
        color: #80808075;
        text-align: center;
        cursor: pointer;
        :hover{color: #000}
    }
    .default-img{
        height: 200px;
        width: 200px;
        border-radius: 50%;
        background-color: gold;
        font-size: 4rem;
        margin: 0 auto;
        text-align: center;
        p{padding-top: 25%;}
    }
`;

const Gallery = styled.div`
    width: 90%;
    margin: 0 auto;
    height: 65%;
    boder-radius: 2px
    background: #fff;
    box-shadow: 0px 3px 8px gray;
    padding: 4px;
    div{
        margin: 0 auto;
    }
    p{font-family: "Source Sans Pro", sans-serif}
`;


