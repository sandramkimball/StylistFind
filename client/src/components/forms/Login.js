import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';


//COMPONENTS
import { useUserContext } from '../contexts/UserContext';
import { useDataContext } from '../contexts/DataContext';
import PrivateRoute from '../PrivateRoute';
import {axiosWithAuth} from '../utilis/axiosWithAuth';



export default function Login(props) {

    let storage = props.match.headers.authorization;

    const { user, stylist, dispatch } = useUserContext();
    const { dispatchData } = useDataContext();
  
    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    });

    useEffect(() => {
        const userId = (props.match.params.id);
        const userData = props.data.users.find(el => el.id === userId);
        const stylistData = props.data.stylists.find(el => el.id === userId);
        if(userId.ussertype === 'user'){
            dispatchData({ type: 'IMPORT_USER_DATA', payload: userData});
            dispatchData({ type: 'SET_USER', payload: userData});
        } else {
            dispatchData({ type: 'IMPORT_STYLIST_DATA', payload: stylistData});
            dispatchData({ type: 'SET_STYLIST', payload: stylistData});
        }       
      });

    let handleChange = e =>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    let logout = e => {
        let storage = props.match.headers.authorization;
        e.preventDefault();
        axiosWithAuth()
        .post('/api/login', this.state.credentials)
        .then(res=> {
            storage.setItem('token', !res.data.payload);
            this.props.history.push('/login');
        })
        .catch(err=>console.log('You are logged out', err))
    };

    let handleSubmit = e => {
        e.preventDefault();
        useEffect(()=> {
            axiosWithAuth()
            .post('/api/auth/login', this.state.credentials)
            .then(res=> {
                storage.setItem('token', res.data.payload);
            })
            .catch(err=>console.log('Username or password incorrect.', err))
        }, [])

        if(users.find(
            obj=>
                obj.username === credentials.username &&
                obj.password === credentials.password
            )
        ){
            storage.setItem('token', 'user' + credentials.username);
            storage.setItem('usertype', 'user');
            dispatch({
                type: 'LOGIN_SUCCESS',
                usertype: 'user',
                username: credentials.username,
            });
            dispatch({type: 'LOGIN_USER'});
            props.history.push(`/user-dash/${props.user.id}`);
        } else if (
            stylists.find(
            obj =>
                obj.username === credentials.username &&
                obj.password === credentials.password,
            )
        ){
            localStorage.setItem('token', 'stylist' + credentials.username);
            localStorage.setItem('usertype', 'stylist');
            dispatch({
                type: 'LOGIN_SUCCESS',
                usertype: 'stylist',
                username: credentials.username,
            });
            dispatch({type: 'LOGIN_STYLIST'});
            props.history.push(`/stylist-dash/${props.stylist.id}`);
        } else {
            dispatch({type: 'LOGIN_FAILURE'})}
    };
     
     
    return (
            <LoginPage>
                <LoginForm onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <input 
                        type='text' 
                        name='username' 
                        value={username} 
                        placeholder="username" 
                        onChange={handleChange}
                    />

                    <input 
                        type='password' 
                        name='password' 
                        value={password} 
                        placeholder="password" 
                        onChange={handleChange}
                    />

                    <div>
                        <button type='submit' onClick={login}>Login</button>
                        <button type='submit' onClick={logout}>Logout</button>
                        <NavLink to='/signup'><button>Signup</button></NavLink>
                    </div>
                </LoginForm>
            </LoginPage>
        );
};





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