import React, { useState } from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

const ReviewForm = (props) => {
    const stylistId = props.match.params.id;
    const userId = localStorage.getItem('id')
    const [newReview, setNewReview] = useState({
        review: '',
        image: '',
        user_id: userId,
        stylist_id: stylistId,
    })
    
    const handleChange = e => {
        e.preventDefault();
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        axiosWithAuth()
        .post(`users/${userId}/reviews`, newReview)
        .then(() => {
            console.log('review sent by user', userId);
            props.history.push(`/stylists/${stylistId}/portfolio`);
        })
        .catch(err=> console.log('Unable to submit review.',err.message))
    }

    return(
        <AddReviewBox onSubmit={handleSubmit}>
            <h4>Add a Review for</h4>
            <input 
                label='upload image'
                type='file'
                accept='image/*'
                name='image'
                onChange={handleChange}
                value={props.image}
            />
            <textarea 
                rows='4' 
                placeholder='How was your experience?' 
                value={newReview.review}
                name='review'
                onChange={handleChange}
            >
            </textarea>
            
            <div className='btn-box'>
                <button onClick={handleSubmit}>Submit</button>
                <Link to={`/stylists/${stylistId}/portfolio`}>
                    <button>Cancel</button>
                </Link>
            </div>
        </AddReviewBox>
    )
    
}

export default ReviewForm;

const AddReviewBox = styled.form`
    width: 40vw;
    margin: 5vh auto;
    padding: 5vh 0;
    display: flex;
    justify-content: center;
    align-content: space-between;
    align-items: center;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 4px 8px gray;
    border-radius: 4px;
    h4{
        margin: 0;
        font-family: 'Dancing Script', sans-serif;
        font-size: 1.5rem;
    }
    textarea{ 
        padding: 4px;
        margin: 10px 0;
        width: 90%;
        font-size: 1.25rem;
        font-family: 'Source Sans Pro',sans-serif;
    }
    p{ 
        background: white;
        max-width: 45%;
        padding: 5px 10px;
        margin: 2px auto;
        font-size: 1.25rem;
        border-radius: 2px;
        :hover{cursor: pointer; color: gray}
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