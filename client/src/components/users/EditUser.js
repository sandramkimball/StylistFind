import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';
import defaultImg from '../../images/default-profile.jpg'


const EditUser = (props) => {
    const [user, setUser] = useContext(UserContext);
    const token = localStorage.getItem('token')
    const user_id = 3
    if (user.profile_img === null){
        setUser({ profile_img: defaultImg })
    }
    console.log('user context:', user)

    const handleChange = e => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleImageChange = e => {
        e.preventDefault()
        setUser({ ...user, profile_img: e.target.files[0]});
    }

    const submitImage = () => {   
        const fd = new FormData().append('userImg', user.profile_img)
        const config = {
            headers: {
                'content-type': 'multipart/form-date'
            }
        }
        axiosWithAuth()
        .put(`users/${user_id}/upload`, fd, config, token)
        .then(()=> {
            console.log('image sent')
            props.history.push(`/users/${user.id}/dash`) 
        })            
        .catch(err=> console.log('Unable to send image.', err, err.message))
    }

    // BUG: OnSubmit, context doesn't persist and must re-login,
    // but changes still go through
    const handleSubmit = e => {        
        e.preventDefault()
        axiosWithAuth()
        .put(`/users/${user_id}`, user, token)
        .then(()=> { 
            return submitImage()
        })
        .catch(err=> console.log('Unable to make updates.', err, err.message))
    };

    return (
        <EditForm>
        <h3>Edit Profile</h3>
        <img src={defaultImg} alt='user profile'/>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
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


const EditForm = styled.div`
    display:flex;
    width: 30vw;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: auto;
    padding: 20px;
    flex-direction: column;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 3px 8px gray;
    img{
        height: 200px;
        width: 200px;
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