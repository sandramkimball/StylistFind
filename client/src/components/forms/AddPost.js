import React, {useState} from 'react';
import styled from 'styled-components';


const AddPost = props => {

    const [newPost, setNewPost] = useState();
    // const initialPost = {
    //     username: '',
    //     date: date.Now(),
    //     salon: '',
    //     stylist: '',
    //     imageUrl: '',    
    // }

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        setNewPost({
            ...newPost,
            [ev.target.name]: value
            })
    }


    const handleSubmit = e => {
        e.preventDefault()
    };

return (
    <div> 
        <AddImage onSubmit={handleSubmit}>
            <input 
                type='file'
                accept='image/*'
                name='image'
                onChange={handleChange}
                value={props.imageUrl}
            />
            <input
                type='text'
                name='comment'
                onChange={handleChange}
                value={props.comment}
            />
            <SaveBtn onClick={handleSubmit}>Upload</SaveBtn>
        </AddImage>
    </div>
    )
}

export default AddPost;

const SaveBtn = styled.button`
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

const AddImage = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #80808095;
    width: 100%;
    padding: 5px;
    input{
        margin: 20px;
        background: none;
    }
`;