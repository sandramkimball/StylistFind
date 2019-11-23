import React, { useState, useEffect } from "react";
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

//COMPONENTS
import { useUserContext } from '../contexts/UserContext';
import { useDataContext } from '../contexts/DataContext';
import { axiosWithAuth } from "../utilis/axiosWithAuth";

export default function SignUp(props) {
  const { user, dispatch } = useUserContext();
  const { dispatchData } = useDataContext();

  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    password: '',
    city: '',
    email: '',
    isStylist: false,
    id: Date.now(),
  });


  const handleChange = e =>
  setRegistrationInfo({ ...registrationInfo, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();}

    // const users = [...testCustomers, ...testStylists];
    // if (users.map(obj => obj.username).includes(registrationInfo.username)) {
    //   dispatch({ type: 'REGISTRATION_FAILURE' });
    // } else {
    //   localStorage.setItem('token', 'register' + registrationInfo.username);
    //   localStorage.setItem('usertype' + registrationInfo.isStylist);
    //   dispatch({
    //     type: 'REGISTRATION_SUCCESS',
    //     username: registrationInfo.username,
    //     city: registrationInfo.city,
    //   });
    //   if(user === 'stylist'){
    //     props.history.push(`/stylist-dash/${registrationInfo.id}`)
    //   } else {
    //     props.history.push(`/customer-dash/${registrationInfo.id}`)

    //   }
    //   }
    // };

    // if (localStorage.getItem('token')) {
    //   if (user.usertype === 'stylist') {
    //     return <Redirect to='/stylist-dash' />;
    //   } else {
    //     return <Redirect to={`/customer-dash/${localStorage.getItem('customer')}`} />;
    //   }
    // }

  return (
    <SignupPage>
      <SignupForm>
        <h3>Sign Up</h3>

        <input
          type='text'
          name='first_name'
          value={this.state.credentials.first_name} 
          placeholder="first name" 
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='last_name'
          value={this.state.credentials.last_name} 
          placeholder="last name" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='username'
          value={this.state.credentials.username} 
          placeholder="username" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='password'
          value={this.state.credentials.password} 
          placeholder="password" 
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='email'
          value={this.state.credentials.email} 
          placeholder="email" 
          onChange={this.handleChange}
        />
  
  {/* {usertype === stylist && ( */}
      <div>
          <input
            type='text'
            name='street_address'
            value={this.state.credentials.street_address} 
            placeholder="street address" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='city'
            value={this.state.credentials.city} 
            placeholder="city" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='country'
            value={this.state.credentials.country} 
            placeholder="country" 
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='zipcode'
            value={this.state.credentials.zipcode} 
            placeholder="zipcode" 
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='salon'
            value={this.state.credentials.salon} 
            placeholder="salon_name" 
            onChange={this.handleChange}
          />
        </div>
    {/* )} */}


       </SignupForm> 
    </SignupPage>
  );
}

const SignupPage = styled.div`
    width: 60vw
`;

const SignupForm = styled.form`
    display:flex;
    justify-content: center;
    align-content: spece-evenly;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    box-shadow: 1px 2px 4px #000;
    background: white;
    width: 350px;
    height: 300px;
    h3{margin: 0}
    input{
        width: 300px;
        height: 25px;
        margin: 20px;
    }
    div{
        justify-content: space-evenly;
        flex-direction: row
    }
    button{
        color: #000;
        font-size: 1rem;
        border: none;
        background: none;
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;