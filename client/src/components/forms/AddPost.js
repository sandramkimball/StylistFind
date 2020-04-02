import React from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth'
import {Link} from 'react-router-dom'


class AddPost extends React.Component {
    constructor(props){
        super(props)
        this.state={
            date: Date.now(),
            stylist_id: localStorage.getItem('id'),
            image: '',    
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }


    handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
        .post(`/stylists/${this.state.stylist_id}/posts`, {
            date: this.state.date,
            stylist_id: this.state.stylist_id,
            image: this.state.image,
            comment: this.state.comment
        })
        .then(()=> 
            this.props.history.push(`/stylists/${this.state.stylist_id}/dash`)
        )
        .catch(err=> console.log('Unable to submit post.', err))
    };

    render(){
        return (
            <div> 
                <PostForm onSubmit={this.state.handleSubmit}>
                    <input 
                        type='file'
                        accept='image/*'
                        name='image'
                        onChange={this.state.handleChange}
                        value={this.state.image}
                    />
                    <textarea
                        type='textarea'
                        name='comment'
                        rows='12' 
                        cols='20' 
                        placeholder='Add a comment...'
                        onChange={this.state.handleChange}
                        value={this.state.comment}
                    ></textarea>
                    <p onClick={this.state.handleSubmit}>Upload</p>
                    <Link to={`/stylists/${this.state.stylist_id}/dash`} className='return-btn'><p>Cancel</p></Link>
                </PostForm>
            </div>
        )
    }
}

export default AddPost;

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40vw;
    margin: auto;
    padding: 20px;
    background: orange;
    border-radius: 2px;
    input{
        height: 50px;
        padding: 10px 0;
        font-size: 1.25rem;
    }
    textarea{
        border: none; 
        padding: 4px;
        font-size: 1.25rem;
        font-family: 'Source Sans Pro',sans-serif;
    }
    input button{ 
        background: white;
        border: 1px solid black;
        font-size: 1rem;
        height: 1.25rem
        :hover{
            transform: scale(1.025); 
            border: 1px solid #80808075;
            color: #80808075;
        }
    }
    .return-btn, p{        
        text-decoration: none;
        width: 25%;
        color: #000;
        background: #fff;
        padding: 5px 10px;
        margin: 2px auto;
        font-size: 1.25rem;
        border-radius: 2px;
        :hover{cursor: pointer; color: gray}
    }
`;