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
                    <h3>Login</h3>
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
                    <Link to='/signup'><p>Sign Up</p></Link>
                </LoginForm>
                    <img src='https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80' alt='salon chair and makeup light'/>
            </LoginPage>
    )
}};

export default Login;


const LoginPage = styled.div`
    width: 90vh;
    height: 80vh;
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
    width: 50%;
    h3{margin: 0; font-size: 1rem}
    input, button{
        height: 25px;
        width: 80%
        margin: 5px auto;
        border: 1px solid #80808095;
        font-size: 1rem;
        padding: 2px;
        border-radius: 2px;
    }
    button{
        background: orange;
        padding: 5px;
        color: #fff;
        border: none;
        height: 30px;
        :hover{transform: scale(1.025); cursor: pointer}
    }
`;