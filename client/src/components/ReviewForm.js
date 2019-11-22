import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {useDataContext} from './contexts/DataContext';
import {axiosWithAuth} from './utilis/axiosWithAuth';

const ReviewForm = (props) => {
    const {data, dispatchData} = useDataContext();

    const [newReview, setNewReview] = useState({
        id: Date.now(),
        text: '',
        image: '',
        customer: data.customer,
    })
    
    useEffect(()=> setNewReview({
        ...newReview, 
    }, []))

    const handleChange = e => {
        e.preventDefault();
        setNewReview({
            ...newReview,
                [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     dispatchData({
    //         type:'ADD_REVIEW',
    //         payload: newReview
    //     })
    // }

    const handleSubmit = newReview => {
        axiosWithAuth()
        .post('/reviews', newReview)
        .then(res => {
            localStorage.setItem('token', res.data.payload)
        })
        .catch(err=> console.log(err.message))
    }

    return(
        <div>
            <p>Add Review</p>
            <AddReviewBox onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='review'
                    placeholder='Add Comment'
                    onChange={handleChange}
                />

                <input 
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={handleChange}
                    value={props.image}
                />

                {/* <button type='submit'>+Add</button> */}
            </AddReviewBox>
        </div>
    )
    
}

export default ReviewForm;

const AddReviewBox = styled.form`
    display: flex;
    flex-direction: column;
    height: 100px,
    width: 300px,
    background: black,
    color: white
    input{
        height: 50px;
        width: 35%;
    }
    button{
        border: none;
        background: none;
        font-size: 30px
        :hover{
            transform: scale(1.1)
        }
    }
`;