import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function SearchCard(props)  {

    const { 
        profile_img, 
        first_name, 
        last_name, 
        email, salon, id, 
        street_address, city, state, zipcode 
    } = props.result;

    return (
        <Card>
            <Link to={`/stylists/${id}/dash`} key={props.id} id={props.id} props={props}>
                <img src={profile_img} alt='stylist profile'/>
                <div>
                    <h3>{first_name} {last_name}</h3>
                    <h4>{salon}</h4> 
                    <p>{street_address},</p>
                    <p>{city}, {state} {zipcode}</p>
                    <p>{email}</p>
                </div>
            </Link>
        </Card>
    )
}


const Card = styled.div`
    height: 300px;
    width: 300px
    border: .5px solid #e6e6e6
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    font-size: 1rem
    margin: 2px;
    img{
        height: 175px;
        width: 100%;
        object-fit: cover;
    }
    div{
        margin: auto;
        h3{text-decoration: underline; padding: 0; margin: 0}
        h4{font-size: .95rem; margin: 0}
        p{padding: 0; margin: 0; font-size: .85rem }
    }    
    a{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: black
    }
`;

export default SearchCard