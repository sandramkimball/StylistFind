import React from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth'
import {Link} from 'react-router-dom'


class AddPost extends React.Component {
    constructor(props){
        super(props)
        this.state={
            date: Date.now(),
            stylist_id: props.stylist.id,
            image: null,    
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }  
    handleImage = e => {
        e.preventDefault()
        this.setState({profile_img: e.target.files[0]});
    }


    handleSubmit = e => {
        const formattedImg = new FormData() 
        formattedImg.append('file', this.state.image)
        axiosWithAuth()
        .post(`/stylists/${this.state.stylist_id}/posts`, {
            date: this.state.date,
            stylist_id: this.state.stylist_id,
            image: formattedImg,
            comment: this.state.comment
        })
        .then((res) => 
            console.log(res.message),
            this.props.history.push(`/stylists/${this.state.stylist.id}/dash`)
        )
        .catch(err=> console.log('Unable to submit post.', err))
    };

    render(){
        return (
            <PostForm onSubmit={this.handleSubmit}>
                <h1>New Post</h1>
                <input 
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={this.handleImage}
                    value={this.state.image}
                />
                <textarea
                    type='textarea'
                    name='comment'
                    rows='6' 
                    placeholder='Add a comment...'
                    onChange={this.handleChange}
                    value={this.state.comment}
                ></textarea>
                <div className='btn-box'>
                    <button onClick={this.handleSubmit}>Upload</button>
                    <Link to={`/stylists/${this.state.stylist_id}/dash`}>
                        <button>Cancel</button>
                    </Link>
                </div>
            </PostForm>
        )
    }
}

export default AddPost;

const PostForm = styled.form`
    width: 40vw;
    margin: 5vh auto;
    padding: 5vh 0;
    display: flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 4px 8px gray;
    border-radius: 4px;
    h1{
        margin: 0;
        font-family: 'Dancing Script', sans-serif;
        font-size:2rem;
    }
    textarea{ 
        padding: 4px;
        margin: 10px 0;
        width: 90%;
        font-size: 1.25rem;
        font-family: 'Source Sans Pro',sans-serif;
    }
    input{
        height: 25px;
        width: 90%;
        margin: 5px auto;
        border: 1px solid #80808095;
        font-size: 1rem;
        padding: 2px;
        border-radius: 2px;
    }
    .btn-box{ 
        display: flex
        justify-content: space-between
    }
    button{
        background: orange;
        margin: 5px;
        font-size: 1rem;
        width: 15vw;
        padding: 4px ;
        color: #fff;
        border: none;
        height: 30px;
        border-radius: 2px;
        cursor: pointer;
        :hover{background: #ffb836}
    }
`;