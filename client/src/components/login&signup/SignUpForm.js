import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from "../utilis/axiosWithAuth";
import { Redirect, Link } from 'react-router-dom';
import defaultImg from '../../images/default-profile.jpg';
import SalonSignUp from './SalonSignUp';

function SignUpForm(props) {
  const [user, setUser] = useState([])
  let [salonForm, setForm] = useState(false)
  const [state, setState] = useState({ 
      password: '',
      first_name: '',
      last_name: '',
      profile_img: {defaultImg},
      email: '',
      usertype: 'user',
    })


  //Set state with data from form input
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //sets first file to profile_img
  const handleImageChange = e => {
      e.preventDefault()
      setUser({ ...user, profile_img: e.target.files[0]});
  }

  //If stylist, submit routes to salon signup form
  const handleNext = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/auth/register/stylist', state)
    .then(() => setForm(true) )  
    .catch(err=> console.log(err) )
  };

  //if user, submits and routes to dash
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/auth/register/user', state)
    .then((res)=> console.log(res))
    .catch(err=>{console.log(err)})
  };

  return (
    <SignupPage className='login-form'>
      <Form method="post" enctype="multipart/form-data">
        {salonForm === false && (
          <div>
            <h3>Glad You're Here!</h3>
            <input
              type='text'
              name='first_name'
              value={state.first_name} 
              placeholder="first name" 
              onChange={handleChange}
            />
            <input
              type='text'
              name='last_name'
              value={state.last_name} 
              placeholder="last name" 
              onChange={handleChange}
            />

            <input
              type='password'
              name='password'
              value={state.password} 
              placeholder="password" 
              onChange={handleChange}
            />

            <input
              type='text'
              name='email'
              value={state.email} 
              placeholder="email" 
              onChange={handleChange}
            />

            <input 
                type="file" 
                name='profile_image'
                accept="image/*"
                onChange={handleImageChange}
            />

            <div className='check-stylist'>
              I'm a Stylist
              <input 
                type='checkbox'
                label='usertype'
                name='usertype'
                value={'stylist'}
                onClick={handleChange}
              />
            </div>

            {/* conditionally renders submit button for usertype */}
            {state.usertype === 'user' &&(
              <button type='submit' onClick={handleSubmit}>Signup</button>
            )}

            {state.usertype === 'stylist' && (
              <button type='submit' onClick={handleNext}>Next</button>
            )}
            <Link to='/login'><p>Already have an account?</p></Link> 
          </div>
        
        )}
      </Form> 

        {salonForm === true && (
          <div>
            <SalonSignUp/>
          </div>
        )}
    </SignupPage>
  );
}
export default SignUpForm

const SignupPage = styled.section`
  width: 100%;
  margin: auto;
  display:flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  a{
      font-size: .8rem; 
      text-align: right; 
      text-decoration: none; 
      color: black; 
      :hover{color: gray}
  }
  .check-stylist{  
    margin: 0 auto;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input{width: 30%; margin-left: 0}
  }
  a p{text-align: center}
`;


const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  display:flex;
  justify-content: center;
  align-content: spece-between;
  align-items: center;
  flex-direction: column;
  h3{
    margin: 0; 
    font-size: 2rem; 
    font-family: 'Dancing Script', cursive
  }
  p{
    font-size: .8rem; 
    text-align: right; 
  }
  input, button{
      height: 25px;
      width: 50%
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