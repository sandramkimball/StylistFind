import React, {useState} from  'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axiosWithAuth from '../utilis/axiosWithAuth'
    
const Toolbar = (props) => {
    const {id} = props.stylist;
    const [heartColor, setColor] = useState('gray')
    var isAdded = props.added

    const handleSave = e => {
        //determine if already saved
        if(isAdded === true){
            setColor('orange')

        } else{
            setColor('gray')

        }
        // post new fave to bookmark api
        e.preventDefault();
        const userId = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .post(`/users/${userId}/bookmarks`, props.stylist.id, token)
        .then(res=>console.log(res.message))
        .catch(err=>console.log(err.message))
    }
    
    return(
        <Bar>
            <Link to={`/stylist/${id}/reviews`} usertype={'stylist'}><p>Read Reviews</p></Link>

            {localStorage.getItem('usertype') === 'user' && (
                <>
                    <p style={{color:heartColor}} onClick={handleSave}>❤ Save</p>
                    <Link to={`/stylist/${id}/add-review`} params={{ props: props.stylist }}>
                        <p>+Add Review</p>
                    </Link>
                </>
            )}

            {localStorage.getItem('id') === id && (
                <>
                    <Link to={`/stylist/${id}/edit`} className='edit-btn'>
                        <p>Edit</p>
                    </Link>
                    <Link to={`/stylist/${id}/add-post`}>
                        <p>+</p>
                    </Link>
                </>
            )}
        </Bar>
    )
}

export default Toolbar

const Bar = styled.div`
    display: flex;
    a{ padding: 0 5px;
        align-items: center;
    }
    p{
        font-size: 1rem;
        color: gray;
        cursor: pointer;
        :hover{color: orange}
    }    
    .edit-btn{
        color: #80808075;
        :hover{color: #000}
    }
`;