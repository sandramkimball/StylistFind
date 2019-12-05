import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utilis/axiosWithAuth';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';

const initialBio = {
    name: '',
    salon: '',
    imageUrl: '',
    bio: '',
    address: ''
}


const EditBio = props => {
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState(initialBio);
    
    const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
    setBio({
        ...bio,
        [ev.target.name]: value
        })
    }

    useEffect(()=> {
    const bioToEdit = props.bio;
    if (bioToEdit) setBio(bioToEdit);
    }, [props.bio, props.match.params.id]);


    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
        .put(`${props.stylist}`, bio)
        .then(res=> {
            props.updateBio(res.data);
            props.history.push('/stylist-dash');

        })
        setEditing(false);
    };

// const editingBio = bioToEdit  => {
//     setEditing(true);
//     setBio(bioToEdit)
// }

return (
    <div>
        <h3>Edit Profile</h3>
        <ProfileImg>
            <img src={props.imageUrl}/>
            
        </ProfileImg>
        <NavLink to='add-image'><p>change image</p></NavLink>
   
        <EditForm onSubmit={handleSubmit} id='edit-form'>
            <input 
                name='name'
                type='text'
                onChange={handleChange}
                value={props.name}
                placeholder='Name'
            />
            <input 
                name='salon'
                type='text'
                onChange={handleChange}
                value={props.salon}
                placeholder='Salon'
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
                value={props.city}
                placeholder='Address'
            />
            <textarea
                form = 'edit-form'
                name='bio'
                type='text'
                onChange={handleChange}
                value={props.bio}> 
            Enter Bio
            </textarea>
            <div>
                <p className='edit-btn-aft' onClick={handleSubmit}><Link to='/stylist-dash'>Save</Link></p>
            </div>
        </EditForm>
    
    </div>
    )
}



export default EditBio;

const ProfileImg = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin: 0 auto;
    border: 1px solid purple;
`;

const EditForm = styled.form`
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: .5px 1px 2px #000;
    width: 30%;
    input{
        margin: 20px;
        justify-content: center;
    }
    textarea{
        margin: 20px;
        height: 100px;
        color: gray;
    }
    div{
        display: flex;
        justify-content: center
    }
    .edit-btn-aft{
        color: #000;
        font-size: 1.25rem;
        border: none;
        background: none;
        margin: 0 20px;
    a{
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;