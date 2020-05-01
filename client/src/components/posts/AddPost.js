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
            <div> 
                <PostForm onSubmit={this.handleSubmit}>
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
                        cols='20' 
                        placeholder='Add a comment...'
                        onChange={this.handleChange}
                        value={this.state.comment}
                    ></textarea>
                    <p onClick={this.handleSubmit}>Upload</p>
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
    border-radius: 4px;
    input{
        height: 30px;
        padding: 10px 0;
        border-radius: 4px;
        font-size: 1.05rem;
    }
    textarea{
        border: none; 
        padding: 4px;
        margin: 10px 0;
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
    p, a.return-btn{        
        text-decoration: none;
        text-align: center
        width: 25%;
        color: #000;
        background: #fff;
        padding: 2px 0;
        margin: 2px auto;
        font-size: 1rem;
        border-radius: 2px;
        :hover{cursor: pointer; color: gray}
    }
`;