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
            <Exit>X</Exit>
            <input 
                type='file'
                accept='image/*'
                name='image'
                onChange={handleChange}
                value={props.imageUrl}
            />
            <textarea
                type='textarea'
                name='comment'
                rows='8'
                place holder='Add Comment'
                onChange={handleChange}
                value={props.comment}
            ></textarea>
            <Btn onClick={handleSubmit}>Upload</Btn>
        </AddImage>
    </div>
    )
}

export default AddPost;

const Exit = styled.h1`
    padding-right: 5px;
    margin-top: -20px;
    width: 100%;
    text-align: right;
    position: 99%;
    font-size: 1.5rem;
    color: gray
    cursor: pointer;
`;

const Btn = styled.button`
    background: white;
    border: 1px solid black;
    font-size: 1rem;
    height: 1.5rem;
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
    flex-direction: column;
    justify-content: space-evenly;
    border: 1px solid #80808095;
    max-width: 100%;
    height: 300px;
    padding: 5px;
    textarea{width: 90%;border: 1px solid black; font-family: sans-serif}
    input {max-height: 100%; width: 90%;}
    input button{ 
        background: white;
        border: 1px solid black;
        font-size: 1rem;
        height: 1.25rem
        :hover{
            transform: scale(1.025); 
            border: 1px solid #80808075;
            color: #80808075;
        }
    }
`;