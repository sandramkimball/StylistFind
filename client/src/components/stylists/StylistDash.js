import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import PostCard from '../posts/PostCard';
import Toolbar from './Toolbar'

class StylistDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stylist: [],
            salon: [],
            posts: [],
            isSaved: false,
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = e => {
        e.preventDefault();
        const cssName = (this.state.isSaved === false) ? true : false
        this.setState({isSaved: cssName})
        // props.user.bookmarks.push({stylist: this.state.stylist})
    }
    
    componentDidMount(props){
        const { match: { params } } = this.props;
        axiosWithAuth()
        .get(`/stylists/${params.id}`)
        .then(res=> { 
            this.setState({ stylist: res.data });
            return axiosWithAuth()
            .get(`/stylists/${params.id}/posts`)
            .then(res=> { 
                this.setState({ posts: res.data });
            })
        })
        .catch(err=>{console.log(err)});
    }


    render(){
        return (
            <Dash>
                <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
                <InfoBox>
                    <Toolbar stylist={this.state.stylist} isAdded={this.state.isAdded}/>
                    <div className='profile-pic-box'>
                        <img src={`${this.state.stylist.profile_img}`} alt='profile of user'/>
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
                    <div>
                        {this.state.posts.map(post=> (
                            <PostCard 
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


