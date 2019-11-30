import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';




function SearchCard(props)  {
    const { profile_img, first_name, last_name, salon, bio, id, email } = props.result;

    return (
        <Card>
            <Link to={`/stylist-dash/${id}`}>
                <img src={profile_img} alt='stylist profile'/>
                <div>
                    <h3>{salon}</h3>
                    {/* <h4>{first_name} {last_name}</h4>  */}
                    {/* <p>Address: {city}</p> */}
                    {/* <p>{email}</p>
                    <p>{bio}</p> */}
                </div>
            </Link>
        </Card>
    )
}


const Card = styled.div`
    height: 300px;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: .5px 2px 3px #000;
    background: white;
    text-align: left;
    display: flex;
    flex-direction: row;
    h3{border-bottom: 1px solid #80808095; padding-bottom: 5px;}
    img{
        height: 300px;
        width: 300px;
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
    :hover{transform: scale(1.025)}
`;

export default SearchCard