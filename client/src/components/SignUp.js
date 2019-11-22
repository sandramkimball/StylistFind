import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

//COMPONENTS
import { useUserContext } from './contexts/UserContext';
import { useDataContext } from './contexts/DataContext';
import { axiosWithAuth } from "./utilis/axiosWithAuth";

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
      <img alt='curly blonde hair and green leaves' src='https://images.unsplash.com/photo-1497433550656-7fb185be365e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'/>
      <SignupForm onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

        <Form.Group controlId="formGroupEmail" className='input-grp'>
          <Form.Control 
          type="text" 
          placeholder="Username"
          id='username'
          name='username'
          placeholder='Username'
          value={registrationInfo.username}
          onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formGroupEmail" className='input-grp'>
          <Form.Control 
            type="text" 
            placeholder="Email"
            id='email'
            name='email'
            value={registrationInfo.email} 
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formGroupPassword" className='input-grp'>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            id='password'
            name='password'
            value={registrationInfo.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group /*as={Col}*/ controlId="formGridCity" className='input-grp'>
          <Form.Control 
            placeholder="City" 
            type="text" 
            id='city'
            name='city'
            value={registrationInfo.city}
            onChange={handleChange}
          />
        </Form.Group>
        
      <p>I am a Stylist</p>
        <Form.Group controlId="formGroupUsertype" className='select-grp'>
          <Form.Check 
            type='checkbox'
            value={registrationInfo.isStylist}
            id='isStylist'
            name='isStylist'
            onChange={handleChange}
          />         
        </Form.Group>
      {registrationInfo.isStylist && (
        <Form.Group controlId="formGroupSalon" className='input-grp'>
          <Form.Control 
            type="text" 
            placeholder="Salon Name" 
            id='salon'
            name='salon'
            value={registrationInfo.salon}
            onChange={handleChange}
          />
        </Form.Group>
      )}

        {user.error && <p>{user.error}</p>}
        
        <button type="submit">Submit</button>

      </SignupForm>

    </SignupPage>
  );
}

const SignupPage = styled.div`
    img{
        height: 100vh;
        width: 100vw;
        object-fit: cover
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
    };
`;

const SignupForm = styled.form`
    display:flex;
    margin: 100px auto;
    padding: 10px;
    flex-direction: column;
    box-shadow: 1px 2px 4px #000;
    background: white;
    width: 350px;
    justify-content: center;
    input{
        width: 300px;
        margin: 20px;
    }
    div{
        display: flex;
        justify-content: center
    }
    p{
      margin: 0;
      padding: 0;
    }
    
    button{
        color: #000;
        font-size: 1rem;
        border: none;
        padding: 5px 7px;
        background: none;
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;