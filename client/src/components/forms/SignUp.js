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
  // const {user, setUser} = useState();
  // const {stylist, setStylist} = useState();

  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
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
    usertype: 'user' || 'stylist',
    id: Date.now(),
  });


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

    //USER
      const userId = (props.match.params.id);
      const userData = props.data.users.find(el => el.id === userId);
      dispatchData({type: 'SET_USER', payload: userData})

    //STYLIST
      const stylistId = (props.match.params.id);
      const stylistData = props.data.stylists.find(el => el.id === stylistId);
      dispatchData({type: 'SET_STYLIST', payload: stylistData})

  const users = [...users];
  const stylists = [ ...stylists];
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

  if ('token') {
    if (user.usertype === 'stylist') {
      return <Redirect to={`/stylist-dash/:${stylist.id}`} />;
    } else {
      return <Redirect to={`/user-dash/:${user.id}`} />;
    }
  };

  return (
    <SignupPage>
      <SignupForm onSubmit = {handleSubmit}>
        <h3>Sign Up</h3>

        <input
          type='text'
          name='first_name'
          value={this.first_name} 
          placeholder="first name" 
          onChange={handleChange}
        />
        <input
          type='text'
          name='last_name'
          value={this.last_name} 
          placeholder="last name" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='username'
          value={this.username} 
          placeholder="username" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='password'
          value={this.password} 
          placeholder="password" 
          onChange={handleChange}
        />

        <input
          type='text'
          name='email'
          value={this.email} 
          placeholder="email" 
          onChange={handleChange}
        />

        <input 
          type='radio'
          label='user'
          name='usertype'
          value={this.usertype === stylist}
          onChange={handleChange}
        />

        <input 
          type='radio'
          label='stylist'
          name='usertype'
          value={this.usertype === user}
          onChange={handleChange}
        />
  
  {props.usertype === 'stylist' && (
      <div>
          <input
            type='text'
            name='street_address'
            value={this.street_address} 
            placeholder="street address" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='city'
            value={this.city} 
            placeholder="city" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='country'
            value={this.country} 
            placeholder="country" 
            onChange={handleChange}
          />
          <input
            type='text'
            name='zipcode'
            value={this.zipcode} 
            placeholder="zipcode" 
            onChange={handleChange}
          />

          <input
            type='text'
            name='salon'
            value={this.salon} 
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