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
        this.openAddPost = this.openAddPost.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    
    openAddPost = e => {
        e.preventDefault();
        console.log('Will open add post form.')
    }

    handleReviewChange = e => {
        e.preventDefault()
        this.setState({ user_review: {[e.target.name]: e.target.value} });
    }

    handleReview = e => {
        e.preventDefault()
        this.setState({ user_review: {stylist_id: this.state.stylist.id} })
        axiosWithAuth()
        .post(`users/${localStorage.getItem('id')}/reviews`, this.state.user_review)
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
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
                        <p className={`add-stylist ${this.state.added ? "not-saved" : "saved"}`} onClick={this.state.handleSave}>❤</p>
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
                <Link to={`/${this.state.stylist.id}/reviews`}><p className='read-reviews'>Read Reviews</p></Link>
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
                        {localStorage.getItem('usertype') === 'user' && (
                            <form onSubmit={this.handleReview} className='add-review'>
                                <textarea 
                                    rows='6' 
                                    cols='40' 
                                    placeholder='Write a review.' 
                                    value={this.state.user_review.review}
                                    name='review'
                                    onChange={this.handleReviewChange}
                                ></textarea>
                                <p onClick={this.handleReview}>Submit</p>
                            </form>
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
    .add-review{
        position: fixed;
        bottom: 10px;
        right: 5vw;
        z-index: 10;
        background: orange;
        border-radius: 2px;
        padding: 10px 20px;
        textarea{
            border: none; 
            padding: 2px;
            font-size: 1rem;
            font-family: 'Source Sans Pro',sans-serif;
        }
        p{ 
            background: white;
            max-width: 45%;
            padding: 5px 10px;
            margin: 2px auto;
            font-size: 1rem;
            :hover{cursor: pointer; color: gray}
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
    .add-stylist{
        text-align: right;
        padding: 0 15px;
        font-size: 2rem;
        color: gray;
        cursor: pointer;
        :hover{
            // transform: scale(1.1);
            color: #f74d86;
        }
    }
    .saved{
        color: #f74d86;
    }
    .read-reviews{
        font-size: 1.25rem;
        padding: 0 15px;
        margin-top: 5%;
        text-align: right;
        cursor: pointer;
        :hover{color: orange}
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


