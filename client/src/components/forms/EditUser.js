import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';



const EditUser = props => {
    const initialBio = {
        name: '',
        image_url: '',
        address: '',
        email: ''
    }
    const [profile, setProfile] = useState(initialBio);

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        setProfile({
            ...profile,
            [ev.target.name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
        .put(`/user/${localStorage.getItem('id')}`, profile)
        .then( ()=> {
            console.log('Successfully updated');
            props.history.push(`/user/${localStorage.getItem('id')}/dash`);
        })
        .catch(err=> console.log('Error updating', err))
    };


return (
    <div>
        <h3>Edit Profile</h3>
        <ProfileImg>
            <img src={props.imageUrl}/>
        </ProfileImg>
        <form action='/action_page.html'>
            update image: 
            <input 
                type="file" 
                id="img" 
                name="img" 
                accept="image/*"
            />
        </form>
   
        <EditForm onSubmit={handleSubmit}>
            <input 
                name='name'
                type='text'
                onChange={handleChange}
                value={props.name}
                placeholder='Name'
            />

            <input 
                name='email'
                type='text'
                onChange={handleChange}
                value={props.email}
                placeholder='Email'
            />

            <input 
                name='address'
                type='text'
                onChange={handleChange}
                value={props.address}
                placeholder='Address'
            />

            <div>
                <p className='edit-btn-aft' onClick={handleSubmit}>
                    <button>Save</button>
                </p>
            </div>
        </EditForm>
    
    </div>
    )
}



export default EditUser;

const ProfileImg = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin: 0 auto;
    border: 1px solid purple;
`;

const EditForm = styled.form`
    display:flex;
    width: 40vw;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
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
        padding: 2px 5px;
        color: #fff;
        border: none;
        height: 30px;
        cursor: pointer
    }    
`;