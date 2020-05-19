import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';
import defaultImg from '../../images/default-profile.jpg'


const EditUser = (props) => {
    const [user, setUser] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');

    const handleChange = e => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleImageChange = e => {
        e.preventDefault()
        setLoading(true)

        //Format file and headers:
        const fd = new FormData();
        fd.append('name', e.target.files[0].name);
        fd.append('userImg', e.target.files[0]);

        //Submit file to recieve filePath for user.profile_img:
        axiosWithAuth()
        .put(`users/${user_id}/uploads`, fd, { 
            headers: { 'content-type': 'multipart/form-data' }
        })
        .then(res=> {
            console.log('Image Sent:', res.data)
            setUser({...user, profile_img: res.data.file})
            setLoading(false)
        })            
        .catch(err=> {
            console.log('Client Error: Image not sent.', err.message, err)
            setLoading(false)
        })
    }

    const handleSubmit = e => {        
        e.preventDefault()
        axiosWithAuth()
        .put(`/users/${user_id}`, user, token, { 
            headers: { 'content-type': 'multipart/form-data' }
        })
        .then(()=> { props.history.push(`/users/${user_id}/dash`) })
        .catch(err=> console.log('Client Side Error: Unable to make updates.', err, err.message))
    };

    useEffect(()=>{
        axiosWithAuth()
        .get(`/users/${user_id}/`, token) 
        .then(res=> setUser(res.data) )
        .catch(err => console.log(err.response) );
        if (user.profile_img === null){
            setUser({ profile_img: defaultImg })
        }
    }, [])

    return (
        <EditForm className='edit-form'> 
            <h3>Edit Profile</h3>
            {isLoading === false && (<img src={user.profile_img != 'null' ? user.profile_img : {defaultImg} } />)}
            <form onSubmit={handleSubmit} method="PUT" action='/upload' encType="multipart/form-data">
            {isLoading === true && (                        
                <Loader
                    type="Puff"
                    color="#925967"
                    height={150}
                    width={150}
                    className='loader'
                    position='fixed'
                    z-index={20}
                />
            )}
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
    width: 45vw;
    margin: 5vh auto;
    height: 71vh;
    display: flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 4px 8px gray;
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
        width: 90%;
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