import React from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';


class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                id: localStorage.getItem('id'),
                first_name: '',
                last_name: '',
                profile_img: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const id = localStorage.getItem('id')
        axiosWithAuth()
        .get(`/users/${id}`)
        .then(res=> { 
            this.setState({user: res.data})
        })

        .catch(err=>{console.log('Error fetching user data', err.response)});
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ ...this.state, user: {...this.state.user, [e.target.name]: e.target.value} });
    }

    handleImageChange = e => {
        e.preventDefault()
        this.setState({profile_img: e.target.files[0]});
    }

    handleSubmit = e => {        
        const id = localStorage.getItem('id')
        e.preventDefault()
        axiosWithAuth()
        .put(`/users/${this.state.user.id}`, this.state.user)
        .then(()=> {
            console.log('Successfully updated');
            this.props.history.push(`/user/${this.state.user.id}/dash`);
        })
        .catch(err=> console.log('Unable to make updates.', err))
    };

    render(){
        return (
            <EditForm>
            <h3>Edit Profile</h3>
            <img src={this.state.profile_img} alt='user profile'/>
            <form onSubmit={this.state.handleSubmit} enctype='multipart/form-data'>
                <input 
                    type="file" 
                    className="img-input" 
                    name="profile_img" 
                    value={this.state.user.profile_img}
                    accept="image/*"
                    onChange={this.handleImageChange}
                />

                <input 
                    name='first_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.user.first_name}
                    placeholder='First Name'
                />

                <input 
                    name='last_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.user.last_name}
                    placeholder='Last Name'
                />

                <input 
                    name='email'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.user.email}
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