import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect} from 'react-router-dom';


//COMPONENTS
import { useUserContext } from './contexts/UserContext';
import { useDataContext } from './contexts/DataContext';
import PrivateRoute from './PrivateRoute';
import {axiosWithAuth} from './utilis/axiosWithAuth';
// import {users, stylists} from '../data';



class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        }
    };

    //   useEffect(() => {
    //     dispatchData({ type: 'IMPORT_CUSTOMER_DATA', payload: testCustomers});
    //     dispatchData({ type: 'IMPORT_STYLIST_DATA', payload: testStylists});
    //     dispatchData({ type: 'SET_STYLIST', payload: testStylists});
    //     dispatchData({ type: 'SET_CUSTOMER', payload: testCustomers});
    //   }, []);

    handleChange = e =>{
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        // axiosWithAuth()
        // .post('/api/login', this.state.credentials)
        // .then(res=> {
        //     localStorage.setItem('token', res.data.payload);
        //     this.props.history.push(`/search`);
        // })
        // .catch(err=>console.log('Access Denied, Cyborg!', err))
    }

    logout = e => {
        e.preventDefault();
    //     axiosWithAuth()
    //     .post('/api/login', this.state.credentials)
    //     .then(res=> {
    //         localStorage.setItem('token', !res.data.payload);
    //         this.props.history.push('/login');
    //     })
    //     .catch(err=>console.log('Have a nice trip', err))
    }

    handleSubmit = e => {
            e.preventDefault();
    // }

        // if( 
        //     users.find(
        //     obj=>
        //         obj.username === credentials.username &&
        //         obj.password === credentials.password
        //     )
        // ){
        //     localStorage.setItem('token', 'user' + credentials.username);
        //     localStorage.setItem('usertype', 'user');
        //     dispatch({
        //         type: 'LOGIN_SUCCESS',
        //         usertype: 'user',
        //         username: credentials.username,
        //     });
        //     dispatch({type: 'LOGIN_CUSTOMER'});
        //     props.history.push(`/customer-dash/${props.customer.id}`);
        // } else if (
        //     stylists.find(
        //     obj =>
        //         obj.username === credentials.username &&
        //         obj.password === credentials.password,
        //     )
        // ){
        //     localStorage.setItem('token', 'stylist' + credentials.username);
        //     localStorage.setItem('usertype', 'stylist');
        //     dispatch({
        //         type: 'LOGIN_SUCCESS',
        //         usertype: 'stylist',
        //         username: credentials.username,
        //     });
        //     dispatch({type: 'LOGIN_STYLIST'});
        //     props.history.push(`/stylist-dash/${props.stylist.id}`);
        // } else {
        //     dispatch({type: 'LOGIN_FAILURE'})}
    }

      
      render(){

        // if (localStorage.getItem('token')) {
        //     if (localStorage.getItem('usertype') === 'stylist') {
        //       return <PrivateRoute to={`/stylist-dash/${localStorage.getItem('id')}`} />
        //     } 
        //     else if (localStorage.getItem('usertype') === 'user'){
        //       return <PrivateRoute to={`/customer-dash/${localStorage.getItem('id')}`} />
        //     } 
        //   }
        return (
            <LoginPage>

                <LoginForm onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input 
                        type='text' 
                        name='username' 
                        value={this.state.credentials.username} 
                        placeholder="username" 
                        onChange={this.handleChange}
                    />

                    <input 
                        type='password' 
                        name='password' 
                        value={this.state.credentials.password} 
                        placeholder="password" 
                        onChange={this.handleChange}
                    />

                    <div>
                        <button type='submit' onClick={this.login}>Login</button>
                        <button type='submit' onClick={this.logout}>Logout</button>
                        <NavLink to='/signup'><button>Signup</button></NavLink>
                    </div>
                </LoginForm>

            </LoginPage>
        );
    }
}

export default Login;



const LoginPage = styled.div`
    width: 40vh;
    height: 40vh;
    align-items: center;
`;


const LoginForm = styled.form`
    display:flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    box-shadow: 1px 2px 4px #80808095;
    background: white;
    width: 60%;
    height: 80%;
    h3{margin: 0; font-size: 2rem}
    input{
        width: 90%;
        height: 25px;
        margin: 20px;
        border:none;
        border-bottom: 1px solid #80808095;
        font-size: 1.25rem
    }
    div{
        justify-content: space-between;
        flex-direction: row
    }
    button{
        color: #000;
        font-size: 1.5rem;
        border: none;
        background: none;
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;