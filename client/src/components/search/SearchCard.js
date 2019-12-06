import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';


function SearchCard(props)  {

    const { 
        profile_img, 
        first_name, 
        last_name, 
        email, salon, bio, id, 
        street_address, city, state, zipcode 
    } = props.result;

    return (
        <Card>
            <Link to={`/stylists/${id}/dash`} key={props.id} id={props.id} props={props}>
                <img src={profile_img} alt='stylist profile'/>
                <div>
                    <h3>{salon}</h3>
                    <h4>{first_name} {last_name}</h4> 
                    <p>{street_address},</p>
                    <p>{city}, {state} {zipcode}</p>
                    <p>{email}</p>
                    <p>{bio}</p>
                </div>
            </Link>
        </Card>
    )
}


const Card = styled.div`
    height: 220px;
    width: 600px;
    margin: 5px auto;
    box-shadow: .5px 2px 3px #000;
    background: white;
    text-align: left;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    h3{border-bottom: 1px solid #80808095; padding-bottom: 5px;}
    p{padding: 0; margin: 0; }
    img{
        height: 100%;
        width: 30%;
        object-fit: cover;
        display: flex;
        margin-right: 20px;
    }
    a{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black
    }
    :hover{transform: scale(1.005)}
`;

export default SearchCard