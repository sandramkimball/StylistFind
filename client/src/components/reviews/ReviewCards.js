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
                        <p>wrote a review for 
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
                </div>
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 310px;
    border: .5px solid #e6e6e6;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 1rem;
    a{color: black; text-decoration: none}
    h4, p{
        text-align: left;
        padding: 0;
        margin: 0;
    }
    .reviewer-info{
        height: 70px;
        width: 100%;
        display: flex;
        div{flex-direction: column;}
        img{
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin: 0;
        }
    }
    .review-text{
        flex-direction: column;
        justify-content: flex-start;
    }

    .review-img img{
        width: 100%;
        height: 120px;
        object-fit: cover;
    }
`;

export default ReviewCard;