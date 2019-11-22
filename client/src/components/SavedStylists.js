import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {useDataContext} from './contexts/DataContext';

function SavedCard(props) {
    const { profile_img, name, id } = props.stylist;

    // const handleDelete = (id) => {
    //     dispatchData({type: 'DELETE_SAVED_STYLIST', payload: id})};

 return(
    <Card>
        <h4>X</h4>
        <NavLink to={`/stylist-dash/${id}`}>
            <img alt='saved stylists profile' src={profile_img}/>
            <p>{name}</p>
        </NavLink>   
    </Card>

    )
};

export default SavedCard

const Card = styled.div`
    width: 150px;
    flex-direction: column;
    margin: 5px;
    p{ font-size: 1.25rem}
    }
    img{
        height: 150px;
        width: 150px;
        object-fit: cover;
    }
    h4{
        text-align: right;
        font-size: 1.25rem;
        :hover{color: #80808095}
    }
    a{
        text-decoration: none;
        color: black;
    }
    :hover{transform: scale(1.05); cursor: pointer}

    `;