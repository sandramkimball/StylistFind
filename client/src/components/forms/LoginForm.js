import React from 'react';
import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom';
// import PrivateRoute from '../PrivateRoute';
import axiosWithAuth from '../utilis/axiosWithAuth';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            credentials: {
                username: '',
                password: '',
                isLoading: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = e =>{
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value 
            }
        }); 
    };

    handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', this.state.credentials)
            .then(res=> {
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/search')
            })
            .catch(err=> console.log('LOGIN ERROR', err.res)) 
    };
     
    render(){
        if(localStorage.getItem('token')) return <Redirect to='/'/>
        // const {username, password, isLoading} = this.state;
        return (
            <LoginPage>
                <LoginForm onSubmit={this.handleSubmit}>
                    <h3>Welcome Back</h3>
                    <input 
                        type='text' 
                        name='username' 
                        value={this.username} 
                        placeholder="Username" 
                        onChange={this.handleChange}
                    />
                    <input 
                        type='password' 
                        name='password' 
                        value={this.password} 
                        placeholder="Password" 
                        onChange={this.handleChange}
                    />
                    <button type='submit' onClick={this.handleSubmit}>Login</button>
                </LoginForm>
            </LoginPage>
    )
}};

export default Login;


const LoginPage = styled.div`
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
`;

const LoginForm = styled.form`
    display:flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    h3{margin: 0; font-size: 2rem; font-family: 'Dancing Script', cursive}
    input, button{
        height: 25px;
        width: 100%
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