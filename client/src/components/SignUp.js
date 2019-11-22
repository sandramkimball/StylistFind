import React, { useState, useEffect } from "react";
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

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
      <h1>Sign Up</h1>
      <img alt='curly blonde hair and green leaves' src='https://images.unsplash.com/photo-1497433550656-7fb185be365e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'/>
      <SignupForm >

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