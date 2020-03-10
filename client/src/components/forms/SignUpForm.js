import React from "react";
import styled from 'styled-components';
import axiosWithAuth from "../utilis/axiosWithAuth";

export default class SignUp extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      password: '',
      first_name: '',
      last_name: '',
      street_address: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      salon: '',
      email: '',
      usertype: 'user',
      id: Date.now(),
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };


  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
      e.preventDefault();
      if(this.state.usertype === 'user'){
        axiosWithAuth()
        .post('/auth/register/user', {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
          email: this.state.email,
          usertype: 'user',
      })
        .then( res=> {
          localStorage.setItem('token', res.data.payload)
          console.log('Signup Successful')
          this.props.history.push('/login')
        })
        .catch(err=>{console.log('FE Error', err)})
      }

      if(this.state.usertype === 'stylist'){
        axiosWithAuth()
        .post('/auth/register/stylist', {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
          email: this.state.email,
          usertype: 'stylist',
          street_address: this.state.street_address,
          city: this.state.city,
          zipcode: this.state.zipcode,
          state: this.state.state,
          country: this.state.country,
          salon: this.state.salon,
      })
        .then( res=> {
          localStorage.setItem('token', res.data.payload)
          this.props.history.push('/login')}
        )
        .catch(err=>{console.log('FE Error', err)})
      }
  };

  render(){
    return (
      <SignupPage>
        <SignupForm onSubmit={this.handleSubmit}>
          <h3>Glad You're Here!</h3>
          <input
            type='text'
            name='first_name'
            value={this.state.first_name} 
            placeholder="first name" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='last_name'
            value={this.state.last_name} 
            placeholder="last name" 
            onChange={this.handleChange}
          />

          <input
            type='password'
            name='password'
            value={this.state.password} 
            placeholder="password" 
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='email'
            value={this.state.email} 
            placeholder="email" 
            onChange={this.handleChange}
          />
          <div className='check-stylist'>
            I'm a Stylist
            <input 
              type='radio'
              label='user'
              name='usertype'
              value={'stylist'}
              onClick={this.handleChange}
            />
          </div>
    
    {this.state.usertype === 'stylist' && (
        <div>
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

            <input
              type='text'
              name='salon'
              value={this.state.salon} 
              placeholder="salon name" 
              onChange={this.handleStylistCheck}
            />
          </div>
      )}
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