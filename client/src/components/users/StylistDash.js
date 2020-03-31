import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import PostCard from '../posts/PostCard';
import defaultImg from '../../images/default-profile.jpg'

class StylistDash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stylist: [],
            posts: [],
            reviews: [],
            added: 'not-saved',
            user_review: {
                review: '',
                user_id: localStorage.getItem('id'),
                stylist_id: ''
            }
        }
        this.handleSave = this.handleSave.bind(this);
    }
    

    handleSave = e => {
        e.preventDefault();
        const cssName = (this.state.added === 'saved') ? 'not-saved' : 'saved'
        this.setState({added: cssName})
        // props.user.bookmarks.push({stylist: this.state.stylist})
    }
    
    componentDidMount(props){
        const { match: { params } } = this.props;
        axiosWithAuth()
        .get(`/stylists/profile/${params.id}`)
        .then(res=> { 
            this.setState({ stylist:(res.data) });
            return axiosWithAuth()
            .get(`/stylists/${params.id}/posts`)
            .then(res=> { 
                this.setState({ posts:(res.data) });
            })
        })
        .catch(err=>{console.log('STYLIST DASH API ERROR: ', err)});
    }


    render(){
        console.log('Stylist Data', this.state.stylist)
        console.log('Posts Data', this.state.posts)
        const hasProfileImage = this.state.stylist.profile_image;
        let profile_image
        let default_image;
        if(!hasProfileImage === null){
            profile_image = <img src={`${this.state.user.profile_img}`} alt='profile of user'/>
        }
        else{default_image = <img src={defaultImg} alt='profile of user'/>}
        return (
            <Dash>
                <Link to='/search'><p className = 'return-to-search'>Return</p></Link>
                <InfoBox>
                    {localStorage.getItem('usertype') === 'user' && (
                        <div className='toolbar'>
                            <p className={`add-stylist ${this.state.added ? "not-saved" : "saved"}`} onClick={this.state.handleSave}>❤Save</p>
                            <Link to={`/stylist/${this.state.stylist.id}/add-review`}><p>+Add Review</p></Link>
                            <Link to={`/${this.state.stylist.id}/reviews`}><p className='read-reviews'>Read Reviews</p></Link>
                        </div>
                    )}
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
                <section className = 'gallery'>
                    <Gallery>
                        <div>
                            {this.state.posts.map(post=> (
                                <PostCard 
                                    id={post.id} 
                                    post={post}
                                    stylist={this.state.stylist}
                                />
                            ))}
                        </div>
                        {localStorage.getItem('usertype') === 'stylist' && (
                            <p className='open-btn' onClick={this.openAddPost}>+</p>
                        )}
                        
                    </Gallery>
                </section>
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
        width: 70%;
    }
    .edit-btn{
        color: #80808075;
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
    .toolbar{
        display: flex;
        p{
            text-align: right;
            padding: 0 15px;
            font-size: 1.25rem;
            color: gray;
            cursor: pointer;
            :hover{color: orange}
        }
    }
`;

const Gallery = styled.div`
    width: 70vw;
    margin: 5vh auto;
    div{
        display: flex;
        flex-wrap: wrap; 
        margin: 0 1px 2px 1px;
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


