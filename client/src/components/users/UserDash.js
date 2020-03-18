import React from 'react';
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
        this.openEdit = this.openEdit.bind(this);
    }
    
    openEdit = e => {
        e.preventDefault();
        this.props.history.push('/edit/user')
    }
    
    componentDidMount(){
        const id = this.props.match.params.id 
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
        const hasProfileImage = this.state.user.profile_image;
        let profile_image
        let default_image;
        if(!hasProfileImage === null){
            profile_image = <img src={`${this.state.user.profile_img}`} alt='profile of user'/>
        }
        else{default_image = <p className='default-img'>{this.state.user.first_name}</p>}

        console.log('LocalStorage:', localStorage)
        console.log('User Data:', this.state.user)
        console.log('User Reviews:', this.state.reviews)
        return (
            <Dash>
                <InfoBox>
                    <div className='profile-pic-box'>
                        {profile_image}
                        {default_image}
                    </div>
                    <div className='profile-text'>
                        <h1>{this.state.user.username}</h1> 
                        <p>{this.state.user.email}</p> 
                    </div>
                    <p className='edit-btn' onClick={this.openEdit}>Edit</p>
                </InfoBox>    
                <section className = 'gallery'>
                    <Gallery>
                        <p>Your Reviews</p>
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
    border-radius: 4px;
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
        margin: 0 auto;
        border-radius: 50%;
        background: gray;
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
    width: 75vw;
    margin: 0 auto;
    div{
        display: flex;
        flex-wrap: wrap; 
        margin: 0 auto;
    }
    p{font-family: "Source Sans Pro", sans-serif}
`;


