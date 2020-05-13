import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';
import defaultImg from '../../images/default-profile.jpg'


const EditUser = (props) => {
    const [user, setUser] = useContext(UserContext);
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');

    if (user.profile_img === null){
        setUser({ profile_img: defaultImg })
    }

    const handleChange = e => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleImageChange = e => {
        e.preventDefault()

        //Format file and headers:
        const fd = new FormData();
        fd.append('userImg', e.target.files[0]);

        //Submit file to recieve filePath for user.profile_img:
        axiosWithAuth()
        .post(`users/${user_id}/upload`, fd, token, { 
            headers: { 'content-type': 'multipart/form-date' }
        })
        .then(res=> {
            console.log('Image uploaded.', res.data)
            setUser({...user, profile_img: res.data })
            props.history.push(`/users/${user_id}/dash`) 
        })            
        .catch(err=> console.log('Client Side Error: Unable to send image.', err.message, err))
    }

    //BUG: Submitting data resets context and need to re-login.
    const handleSubmit = e => {        
        e.preventDefault()
        axiosWithAuth()
        .put(`/users/${user_id}`, user, token)
        .then(()=> { 
            console.log('Edits were successful.')
            props.history.push(`/user/${user_id}/dash`)
        })
        .catch(err=> console.log('Client Side Error: Unable to make updates.', err, err.message))
        console.log('User after Edits Submitted:', user)
    };

    return (
        <EditForm className='edit-form'> 
        <h3>Edit Profile</h3>
        <img src={user.profile_img != 'null' ? user.profile_img : {defaultImg} } />
        <form onSubmit={handleSubmit} method="PUT" action='/upload' encType="multipart/form-data">
            <input 
                name='userImg'
                type="file" 
                className="img-input" 
                accept="image/*"
                onChange={handleImageChange}
            />

            <input 
                name='first_name'
                type='text'
                onChange={handleChange}
                value={user.first_name}
                placeholder='First Name'
            />

            <input 
                name='last_name'
                type='text'
                onChange={handleChange}
                value={user.last_name}
                placeholder='Last Name'
            />

            <input 
                name='email'
                type='text'
                onChange={handleChange}
                value={user.email}
                placeholder='Email'
            />
            <div>
                <p className='edit-btn-aft' onClick={handleSubmit}>
                    <button>Save</button>
                </p>
            </div>
        </form>    
    </EditForm>
    )
}



export default EditUser;


const EditForm = styled.section`
    display:flex;
    width: 30vw;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: 5vh auto;
    padding: 20px;
    flex-direction: column;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 3px 8px gray;
    img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        margin: 5px auto;
        background: #e7e7e7;
    }
    h3{
        margin: 0 0 10px 0; 
        font-size: 2rem; 
        font-family: 'Dancing Script', cursive
    }
    div{
        display: flex;
        justify-content: center;
    }
    .edit-btn-aft{
        color: #000;
        font-size: 1.25rem;
        border: none;
        background: none;
        margin: 0 20px;
    }   
    a{
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
    input, button{
        height: 25px;
        width: 100%
        margin: 5px auto;
        border: 1px solid #80808095;
        font-size: 1rem;
        padding: 2px;
        border-radius: 2px;
    }
    button{
        background: orange;
        padding: 3px 12px;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        height: 100%;
    }   
    .img-input p{
        display: none
    }
`;