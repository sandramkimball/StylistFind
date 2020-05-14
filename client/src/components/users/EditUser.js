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
        console.log('FD', ...fd)

        //Submit file to recieve filePath for user.profile_img:
        axiosWithAuth()
        .post(`users/uploads`, ...fd, token, { 
            headers: { 'content-type': 'multipart/form-date;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL' }
        })
        .then(res=> {
            console.log('Image uploaded!', res)
            setUser({...user, profile_img: res.data.filePath})
            // props.history.push(`/users/${user_id}/dash`) 
        })            
        .catch(err=> console.log('Client Error: Unable to send image.', err.message, err))
    }

    //BUG: Submitting data resets context and need to re-login.
    const handleSubmit = e => {        
        e.preventDefault()
        axiosWithAuth()
        .put(`/users/${user_id}`, user, token)
        .then(()=> { 
            console.log('Edits were successful.')
            props.history.push(`/login`) 
        })
        .catch(err=> console.log('Client Side Error: Unable to make updates.', err, err.message))
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
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    flex-direction: column;
    img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        margin: 5px auto;
        background: #e7e7e7;
    }
    h3{
        margin: 0; 
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
        font-size: .8rem; 
        text-align: right; 
        text-decoration: none; 
        color: black; 
        :hover{color: gray}
    }
    input{
        height: 25px;
        width: 50%
        margin: 5px auto;
        border: 1px solid #80808095;
        font-size: 1rem;
        padding: 2px;
        border-radius: 2px;
    }
    button{
        background: orange;
        margin: 5px auto;
        font-size: 1rem;
        max-width: 30%;
        padding: 4px ;
        color: #fff;
        border: none;
        height: 30px;
        border-radius: 2px;
        cursor: pointer
    }   
    .img-input p{
        display: none
    }
`;