import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import Posts from '../posts/Posts';

class StylistDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stylist: []
        }
        this.openAddPost = this.openAddPost.bind(this);
    }
    
    openAddPost = e => {
        e.preventDefault();
        console.log('Will open add post form.')
    }
    
    componentDidMount(props){
            // const id = props.match.params.id;
            axiosWithAuth()
            .get(`/stylists/profile/${1}`)
            .then(res=> { 
                console.log('Stylist Data: ', res.data);
                this.setState({ stylist:(res.data['0']) });
            })
            .catch(err=>{console.log('SKSKRR ERROR: ', err)});
    }

    render(){
        return (
            <Dash>
                <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
                <InfoBox>
                    <div className='profile-pic-box'>
                        <img src={`${this.state.stylist.profile_img}`} alt='profile of stylist, salon'/>
                    </div>
                    <div className='profile-text'>
                        <h1>{this.state.stylist.first_name} {this.state.stylist.last_name}</h1> 
                        <h3>{this.state.stylist.salon}</h3>
                        <h3>{this.state.stylist.bio}</h3>
                        <div className='address'>
                            <p>{this.state.stylist.email}</p>
                            <p>{this.state.stylist.salon}</p>
                            <p>{this.state.stylist.street_address}</p>
                            <p>{this.state.stylist.city}, {this.state.stylist.state} {this.state.stylist.zipcode}</p>
                        </div>
                    </div>
                </InfoBox>    
                <section className = 'gallery'>
                    <Gallery>
                        <p className='open-btn' onClick={this.openAddPost}>+</p>
                        <div>
                            <Posts key={this.state.stylist.id} id={this.state.stylist.id} stylist={this.state.stylist}/>
                        </div>
                    </Gallery>
                </section>
            </Dash>
        )
    }
}

export default StylistDash;

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


