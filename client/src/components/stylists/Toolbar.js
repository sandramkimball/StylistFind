import React, {useState, useContext} from  'react'
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axiosWithAuth from '../utilis/axiosWithAuth'
    
const Toolbar = (props) => {
    const [user, setUser] = useContext(UserContext)
    const {stylist} = props
    const [heartColor, setColor] = useState('gray')
    var isAdded = props.isSaved

    const handleSave = e => {
        // determine if already saved (later will just filter context.user.bookmarks)
        if(isAdded === true){ setColor('orange') } 
        else{ setColor('gray') }
        
        // post new fave to bookmark api
        e.preventDefault();
        const token = localStorage.getItem('token')
        axiosWithAuth()
        .post(`/users/${user.id}/bookmarks`, props.stylist.id, token)
        .then(res=>console.log(res.message))
        .catch(err=>console.log(err.message))
    }
    
    return(
        <Bar>
            <Link to='/search'><p>Return</p></Link>
            
            <Link to={`/stylist/${stylist.id}/reviews`} usertype={'stylist'}><p>Read Reviews</p></Link>

            {user && (
                <>
                    <p style={{color:heartColor}} onClick={handleSave}>❤ Save</p>
                    <Link to={`/stylist/${stylist.id}/add-review`} params={{ props: props.stylist }}>
                        <p>+Add Review</p>
                    </Link>
                </>
            )}

            {stylist && stylist.id === stylist.id && (
                <>
                    <Link to={`/stylist/${stylist.id}/edit`} className='edit-btn'>
                        <p>Edit</p>
                    </Link>
                    <Link to={`/stylist/${stylist.id}/add-post`}>
                        <p>+</p>
                    </Link>
                </>
            )}

        </Bar>
    )
}

export default Toolbar

const Bar = styled.nav`
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