import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function ReviewCard (props) {
    const {image, username, review, date, id, salon, profile_img, stylist_id, user_id, first_name} = props.review;
    return (
        <div>
            <Card>
                <div className='reviewer-info'>
                    <img src={profile_img}/>
                    <div>
                        <Link to={`/users/${user_id}/dash`} key={user_id} id={user_id} props={props}>
                            <h4>{username}</h4>
                        </Link>
                        <p>wrote a review for</p> 
                        <p>
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
                    <p>{review}</p>
                </div>
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 310px;
    border: .5px solid #e6e6e6;
    border-radius: 2px;
    font-size: 1rem;
    text-align: left; 
    display: flex;
    flex-direction: column;
    h4, p{ padding: 0; margin: 0}
    a{ color: black; text-decoration: underline, font-weight: 400}
    .reviewer-info{
        height: 70px;
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
        min-height: 70px;
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
    }
`;

export default ReviewCard;