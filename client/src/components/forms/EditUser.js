import React from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';


class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            profile_img: '',
            email: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = e => {
        e.preventDefault()
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    handleImageChange = e => {
        e.preventDefault()
        this.setState({profile_img: e.target.files[0]});
    }

    handleSubmit = e => {
        e.preventDefault()
        const id = localStorage.getItem('id')
        axiosWithAuth()
        .put(`/users/${id}`, {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            profile_img: this.state.profile_img,
            email: this.state.email,
        })
        .then( ()=> {
            console.log('Successfully updated');
            this.props.history.push(`/user/${localStorage.getItem('id')}/dash`);
        })
        .catch(err=> console.log('Unable to make updates.', err))
    };

    render(){
    return (
        <EditForm>
            <h3>Edit Profile</h3>
            <img src={this.state.profile_img} alt='user profile'/>
            <form action='/action_page.html' onSubmit={this.state.handleSubmit}>
                <input 
                    type="file" 
                    className="img-input" 
                    name="profile_img" 
                    value={this.state.profile_img}
                    accept="image/*"
                    onChange={this.handleImageChange}
                />

                <input 
                    name='first_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.first_name}
                    placeholder='First Name'
                />

                <input 
                    name='last_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.last_name}
                    placeholder='Last Name'
                />

                <input 
                    name='email'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.email}
                    placeholder='Email'
                />
                <div>
                    <p className='edit-btn-aft' onClick={this.state.handleSubmit}>
                        <button>Save</button>
                    </p>
                </div>
            </form>    
        </EditForm>
        )
    }
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
        border: 1px solid purple;
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