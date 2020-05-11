import React, {useState, useContext} from "react";
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

const ReviewForm = (props) => {
    const [user, setUser] = useContext(UserContext)
    var stylist_id = props.match.params.id;
    const [newReview, setNewReview] = useState({
        review: '',
        image: '',
        stylist_id: stylist_id,
        user_id: user.id,
    })
    
    const handleChange = e => {
        e.preventDefault();
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        axiosWithAuth()
        .post(`users/${user.id}/reviews`, newReview)
        .then(() => {
            props.history.push(`/stylists/${stylist_id}/portfolio`);
        })
        .catch(err=> console.log(err.message))
    }

    return(
        <div>
            {/* <p>You're reviewing {props.stylist.first_name}</p> */}
            
            <AddReviewBox onSubmit={handleSubmit}>
                <textarea 
                    rows='12' 
                    cols='20' 
                    placeholder='How was your experience...' 
                    value={newReview.review}
                    name='review'
                    onChange={handleChange}
                >
                </textarea>
                <h4>Got pics? Add them!</h4>
                <input 
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={handleChange}
                    value={props.image}
                />

                <p onClick={handleSubmit}>Submit</p>
                <Link to={`/stylists/${stylist_id}/dash`} className='return-btn'><p>Cancel</p></Link>
            </AddReviewBox>
        </div>
    )
    
}

export default ReviewForm;

const AddReviewBox = styled.form`
    display: flex;
    flex-direction: column;
    width: 45vw;
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
    p{ 
        background: white;
        max-width: 45%;
        padding: 5px 10px;
        margin: 2px auto;
        font-size: 1.25rem;
        border-radius: 2px;
        :hover{cursor: pointer; color: gray}
    }
    h4{
        font-family: 'Dancing Script', sans-serif;
        text-align: left;
        font-size: 2.25rem;
        margin: 10px 0 0 0;
    }
    .return-btn{        
        text-decoration: none;
        width: 40%;
        color: #000;
        margin: 0 auto;
    }
    
`;