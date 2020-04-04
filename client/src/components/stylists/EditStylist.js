import React from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import styled from 'styled-components';


class EditStylist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stylist: {
                id: localStorage.getItem('id'),
                first_name: props.first_name,
                last_name: props.last_name,
                profile_img: props.profile_img,
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        axiosWithAuth()
        .get(`/stylists/${this.state.stylist.id}`)
        .then(res=> { 
            this.setState({stylist: res.data})
        })

        .catch(err=>{console.log(err.response)});
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ ...this.state, stylist: {...this.state.stylist, [e.target.name]: e.target.value} });
    }

    handleImageChange = e => {
        e.preventDefault()
        this.setState({profile_img: e.target.files[0]});
    }

    handleSubmit = e => {        
        const id = localStorage.getItem('id')
        e.preventDefault()
        axiosWithAuth()
        .put(`/stylists/${this.state.stylist.id}`, this.state.stylist)
        .then(()=> {
            this.props.history.push(`/stylist/${this.state.stylist.id}/dash`);
        })
        .catch(err=> console.log(err))
    };

    render(){
        return(
            <EditForm>
            <h3>Edit Profile</h3>
            <img src={this.state.profile_img} alt='stylist profile'/>
            <form onSubmit={this.handleSubmit} enctype='multipart/form-data'>
                <input 
                    type="file" 
                    className="img-input" 
                    name="profile_img" 
                    value={this.state.stylist.profile_img}
                    accept="image/*"
                    onChange={this.handleImageChange}
                />

                <input 
                    name='first_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.stylist.first_name}
                    placeholder='First Name'
                />

                <input 
                    name='last_name'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.stylist.last_name}
                    placeholder='Last Name'
                />

                <input 
                    name='email'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.stylist.email}
                    placeholder='Email'
                />
                <div>
                    <p className='edit-btn-aft' onClick={this.handleSubmit}>
                        <button>Save</button>
                    </p>
                </div>
            </form>    
        </EditForm>
        )
    }
}



export default EditStylist;

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