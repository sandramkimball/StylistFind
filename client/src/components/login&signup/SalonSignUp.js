import React from "react";
import styled from 'styled-components';
import axiosWithAuth from "../utilis/axiosWithAuth";
import defaultImg from '../../images/default-profile.jpg'

export default class SalonSignUp extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      salon: '',
      street_address: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      stylist_id: localStorage.getItem('id'),
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };


  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
      .post('auth/register/salon', {
        salon: this.state.salon,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        stylist_id: this.state.stylist_id
    })
    .then(res=> {
        console.log('Salon Signup Response:', res)
        this.props.history.push('/login')
    })   
    .catch(err=>{console.log('FE Error', err)})
    
  };

  render(){
    return (
      <SignupPage>
        <SignupForm onSubmit={this.handleSubmit}>
          <h3>You're clients need to know where to find you.</h3>
            <div>
                <input
                  type='text'
                  name='salon'
                  value={this.state.salon} 
                  placeholder="salon name" 
                  onChange={this.handleChange}
                />
                <input
                type='text'
                name='street_address'
                value={this.state.street_address} 
                placeholder="street address" 
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='city'
                value={this.state.city} 
                placeholder="city" 
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='state'
                value={this.state.state} 
                placeholder="state" 
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='country'
                value={this.state.country} 
                placeholder="country" 
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='zipcode'
                value={this.state.zipcode} 
                placeholder="zipcode" 
                onChange={this.handleChange}
                />
            </div>
            <button type='submit' onClick={this.handleSubmit}>signup</button>
        </SignupForm> 
      </SignupPage>
    );
  }
}

const SignupPage = styled.div`
  width: 50vw;
  height: 50vh;
  margin: auto;
    display:flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    img{height: 100%}
    a{
        font-size: .8rem; 
        text-align: right; 
        text-decoration: none; 
        color: black; 
        :hover{color: gray}
    }
  .check-stylist{
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: space-between;
    input{width: 30%; margin-left: 0}
  }
`;

const SignupForm = styled.form`
display:flex;
justify-content: center;
align-content: spece-between;
align-items: center;
margin: 0 auto;
padding: 20px;
flex-direction: column;
width: 50%;
h3{margin: 0; font-size: 2rem; font-family: 'Dancing Script', cursive}
p{font-size: .8rem; text-align: right; }
input, button{
    height: 25px;
    width: 80%
    margin: 5px auto;
    border: 1px solid #80808095;
    font-size: 1rem;
    padding: 2px;
    border-radius: 2px;
}
button{
    background: orange;
    max-width: 30%;
    padding: 2px 5px;
    color: #fff;
    border: none;
    height: 30px;
    cursor: pointer
}
`;