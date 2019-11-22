import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from './utilis/axiosWithAuth';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const initialImage = {
    imageUrl: '',
    images: []
}


const AddImage = props => {
    const [newImage, setNewImage] = useState(initialImage);
    
    const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
    setNewImage({
        ...newImage,
        [ev.target.name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()
    };

return (
    <div> 
        <ImageForm onSubmit={handleSubmit}>
            <input 
                type='file'
                accept='image/*'
                name='image'
                onChange={handleChange}
                value={props.image}
            />
            <div>
                <p className='edit-btn-aft' onClick={handleSubmit}>
                    <SaveButton>Upload</SaveButton>
                </p>
            </div>
        </ImageForm>
    
    </div>
    )
}



export default AddImage;

const SaveButton = styled.button`
    background: white;
    border: 1px solid black;
    font-size: 1.2rem;
    padding: 10px 15px;
    :hover{
        transform: scale(1.025); 
        border: 1px solid #80808075;
        color: #80808075;
    }
`;

const ImageForm = styled.form`
   display: flex;
   align-items: center;
   border: 1px solid #80808095;
   justify-content: center;
    h3{
        padding: 10px;
        font-size: 1.5rem
    }
    input{
        margin: 20px;
        background: none;
        button{ border: none; color: purple; background: none;}
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