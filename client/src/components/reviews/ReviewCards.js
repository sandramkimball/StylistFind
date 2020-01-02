import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function ReviewCard (props) {
    const {image, username, first_name, review, date, salon, profile_img, stylist_id, user_id} = props.userReview;

    return (
        <div>
            <Card>
                <div className='reviewer-info'>
                    <img src={profile_img}/>
                    <div>
                        <Link to={`/users/${user_id}/dash`} key={user_id} id={user_id} props={props}>
                            <h4>{username}</h4>
                        </Link>
                        <p>Wrote a review for 
                            <Link to={`/stylists/${stylist_id}/dash`} key={stylist_id} id={stylist_id} props={props}>
                               {first_name}
                            </Link>    
                        </p>
                    </div>
                </div>
                <div className='review-img'>
                    <img src={image} alt='review'/>
                </div>
                <div className='review-text'>
                    <h4>{review}</h4>
                    <p>{date} </p>
                </div>
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 30vw;
    padding: 2px;
    border: .5px solid #e6e6e6;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    h4, p{
        text-align: left;
        padding: 5px;
        margin: 0
        text-decoration: none;
        font-size: 1rem;
    }
    .reviewer-info{
        height: 70px;
        display: flex;
        justify-content: flex-start;
        div{flex-direction: column; }
        img{
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin: 0 ;
        }
    }
    .review-text{
        flex-direction: column;
        justify-content: flex-start;
    }

    .review-img img{
        width: 30vw;
        height: 110px;
        object-fit: cover;
    }
`;

export default ReviewCard;