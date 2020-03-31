import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// import axiosWithAuth from '../utilis/axiosWithAuth';


function ReviewCard (props) {
    const {image, review, date, profile_img, stylist_id, user_id, first_name} = props.review;
    const handleDelete = e => {
        e.preventDefault()
        console.log('Delete!')
        // axiosWithAuth()
        // .delete(`/users/${user_id}/reviews/:id`)
    }

    return (
        <div>
            <Card>
                <div className='reviewer-info'>
                    <img src={profile_img} alt='user profile'/>
                    {localStorage.getItem('id') === user_id && (
                        <p className='delete-btn' onClick={handleDelete}>X</p>
                    )}
                    <div>
                        <Link to={`/users/${user_id}/dash`} key={user_id} id={user_id} props={props}>
                            <h4>{first_name} </h4>
                        </Link>
                        <p>
                            <Link to={`/stylists/${stylist_id}/dash`} key={stylist_id} id={stylist_id} props={props}>
                                @{stylist_id}
                            </Link>    
                        </p>
                    </div>
                </div>
                {image && (
                    <div className='review-img' >
                        <img src={image} alt='review'/>
                    </div>
                )}
                <div className='review-text'>
                    <p>{review}</p>
                    <p>{date}</p>
                </div>
            </Card>
        </div>
    )
}

export default ReviewCard;

const Card = styled.div`
    width: 30vw;
    // box-shadow: 0px 3px 8px gray;
    border: .75px solid lightgray;
    border-radius: 2px;
    font-size: 1rem;
    text-align: left; 
    display: flex;
    flex-direction: column;
    background: #fff;
    margin: 10px auto;
    h4{ padding: 0; margin: 0}
    a{ 
        color: black; 
        text-decoration: underline, 
        font-weight: 400
    }
    .reviewer-info{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: flex-start;
        div{flex-direction: column; margin: 5px 0 0 5px}
        img{
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin: 0;
        }
    }
    .review-text{
        margin: 0 auto;
        height: 100%;
        padding: 2px;
        h4{
            font-weight: 200;
            font-size: .75rem;
            padding-top: 5px
        }
    }
    .review-img img{
        width: 100%;
        height: 120px;
        object-fit: cover;
        margin: 0
    }
    .delete-btn{
        position: absolute;
        right: 0;
        color: gray;
        :hover{color: orange}
    }
`;
