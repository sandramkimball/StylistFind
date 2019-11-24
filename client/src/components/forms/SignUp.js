import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

//COMPONENTS
import { useUserContext } from '../contexts/UserContext';
import { useDataContext } from '../contexts/DataContext';
import { axiosWithAuth } from "../utilis/axiosWithAuth";

export default function SignUp(props) {
  const { user, stylist, dispatch } = useUserContext();
  const { dispatchData } = useDataContext();

  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    password: '',
    city: '',
    email: '',
    usertype: 'user' || 'stylist',
    id: Date.now(),
  });

  // const {user, setUser} = useState();
  // const {stylist, setStylist} = useState();


  let handleChange = e =>
  setRegistrationInfo({ ...registrationInfo, [e.target.name]: e.target.value });

  let handleSubmit = e => {
  //     e.preventDefault();
  //     if(props.usertype ==='user'){
  //       axiosWithAuth()
  //       .post('/api/users')
  //       .then(res=> {
  //         console.log(res.data)
  //         setUser(res.data)
  //       })
  //       .catch(err=>{console.log(err.response)})
  //     }

  //     if(props.usertype === 'stylist'){
  //       axiosWithAuth()
  //       .post('/api/stylists')
  //       .then(res=> {
  //         console.log(res.data)
  //         setStylist(res.data)
  //       })
  //       .catch(err=>{console.log(err.response)})
  //     }
  // };

  useEffect(()=> {
      const userId = (props.match.params.id);
      const userData = data.users.find(el => el.id === userId);
      dispatchData({type: 'SET_CUSTOMER', payload: userData})
  }, [])

  const users = [...users, ...stylists];
  const storage = props.match.headers.authorization;

  if (users.map(obj => obj.username).includes(registrationInfo.username)) {
    dispatch({ type: 'REGISTRATION_FAILURE' });
  } else {
    storage.setItem('token', 'register' + registrationInfo.username);
    storage.setItem('usertype' + registrationInfo.usertype);
        dispatch({
          type: 'REGISTRATION_SUCCESS',
          username: registrationInfo.username,
          city: registrationInfo.city,
        });
  };
}
  
  if(user === 'stylist'){
    props.history.push(`/stylist-dash/${registrationInfo.id}`)
  } else {
    props.history.push(`/user-dash/${registrationInfo.id}`)
  };

  if (storage.getItem('token')) {
    if (user.usertype === 'stylist') {
      return <Redirect to='/stylist-dash' />;
    } else {
      return <Redirect to={`/user-dash/${storage.getItem(user.id)}`} />;
    }
  };

  return (
    <SignupPage>
      <SignupForm onSubmit = {handleSubmit}>
        <h3>Sign Up</h3>

        <input
          type='text'
          name='first_name'
          value={first_name} 
          placeholder="first name" 
          onChange={handleChange}
        />
        <input
          type='text'
          name='last_name'
          value={last_name} 
          placeholder="last name" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='username'
          value={username} 
          placeholder="username" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='password'
          value={password} 
          placeholder="password" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='email'
          value={email} 
          placeholder="email" 
          onChange={handleChange}
        />

        <input 
          type='radio'
          label='user'
          name='usertype'
          value={usertype === stylist}
          onChange={handleChange}
        />

        <input 
          type='radio'
          label='stylist'
          name='usertype'
          value={usertype === user}
          onChange={handleChange}
        />
  
  {props.usertype === 'stylist' && (
      <div>
          <input
            type='text'
            name='street_address'
            value={street_address} 
            placeholder="street address" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='city'
            value={credentials.city} 
            placeholder="city" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='country'
            value={country} 
            placeholder="country" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='zipcode'
            value={credentials.zipcode} 
            placeholder="zipcode" 
            onChange={thihandleChange}
          />

          <input
            type='text'
            name='salon'
            value={salon} 
            placeholder="salon_name" 
            onChange={handleChange}
          />
        </div>
    )}


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