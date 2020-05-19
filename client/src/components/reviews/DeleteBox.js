import React, { useState } from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components'

const DeleteBox = (props) => {
    const [boxDisplay, setBoxDisplay] = useState('display: none')
    console.log('boxDisplay', boxDisplay)
    console.log('props', props)

    const handleDelete = e => {
        axiosWithAuth()
        .delete(`/users/${props.user_id}/reviews/${props.id}`)
        .then(res=> 
            console.log('Successfully sent review delete request', res),
            setBoxDisplay('display: none')
        )
        .catch(err=> 
            console.log('Failed to send review delete request', err),
            setBoxDisplay('display: none')
        )
    }

    return (
        <Box>
            <h2>Are you sure you want to delete this?</h2>
            <div>
                <button onClick={setBoxDisplay('display: none')}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </Box>
    )
}

export default DeleteBox;

const Box = styled.section`
    display: none;
    width: 40vw;
    background: #fff;
    border: 4px;
    padding: 5px;
    margin: auto;
    position: fixed:
    z-index: 10;
    box-shadow: 0 4px 10px gray;
    div{ display: flex }
    button{
        position: absolute;
        right: 0;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 700;
        z-index: 10;
        :hover{
            color: orange
        }

    }
`;