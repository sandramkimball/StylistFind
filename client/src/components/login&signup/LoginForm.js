import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

function LoginForm(props){
    const [user, setUser] = useContext(UserContext)
    const [state, setState] = useState({
        isStylist: false,
        isLoggedIn: false,
        loginFail: false,
        email: '',
        password: '',
    })

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    };

    // Separate APIs for stylist and user. 
    const handleSubmit = e => {
        e.preventDefault();
        if(state.isStylist === false){
            axiosWithAuth()
            .post('/auth/login/user', {
                email: state.email,
                password: state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('usertype', 'user')                
                setState({isLoggedIn: true})
                setUser(res.data.user)                  
                //return <Redirect to={`/users/${res.data.user.id}/dash`}/>
                //props.history.push(`/users/${res.data.user.id}/dash`)
            })
            .catch(err=> {
                setState({loginFail: true})
                console.log(err, err.message)
            }) 
        } 
        else{
            axiosWithAuth()
            .post('/auth/login/stylist', {
                email: state.email,
                password: state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.stylist.id)
                localStorage.setItem('usertype', 'stylist')                
                setState({isLoggedIn: true})
                setUser(res.data.user)                    
                return <Redirect to={`/users/${res.data.stylist.id}/dash`}/>
                // props.history.push(`/stylists/${res.data.stylist.id}/dash`)
            })
            .catch(err=> {
                setState({loginFail: true})
                console.log(err, err.message)
            }) 
        }
    };
     

    return (
        <Form className='login-form' onSubmit={handleSubmit}>
            <h3>Welcome Back</h3>
            <input 
                type='text' 
                name='email' 
                value={state.email} 
                placeholder="Email" 
                onChange={handleChange}
            />
            <input 
                type='password' 
                name='password' 
                value={state.password} 
                placeholder="Password" 
                onChange={handleChange}
            />
            <div className='check-stylist'>
                I'm a Stylist
                <input 
                    type='checkbox'
                    label='isStylist'
                    name='isStylist'
                    value={'true'}
                    onClick={handleChange}
                />
            </div>
            <button type='submit' onClick={handleSubmit}>Login</button>
            {state.loginFail === true && (
                <p className='login-fail'>Email or Password Incorrect</p>
            )}
            <Link to='/signup'><p>Don't have an account?</p></Link> 
        </Form>   
)};

export default LoginForm;


const Form = styled.form`
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    flex-direction: column;
    a{
        font-size: .8rem; 
        text-align: right; 
        text-decoration: none; 
        color: black; 
        :hover{color: gray}
    }
    h3{
        margin: 0; 
        font-size: 2rem; 
        font-family: 'Dancing Script', cursive
    }
    
    input{
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
        margin: 5px auto;
        width: 25%;
        font-size: 1rem;
        max-width: 30%;
        padding: 4px ;
        color: #fff;
        border: none;
        height: 30px;
        border-radius: 2px;
        cursor: pointer
    }    
    .check-stylist{
      display: flex;
      width: 50%;
      align-items: center;
      justify-content: space-between;
      input{width: 30%; margin-left: 0}
    }
    .login-fail p{
        color: red,
        font-size: .5rem;
    }
`;