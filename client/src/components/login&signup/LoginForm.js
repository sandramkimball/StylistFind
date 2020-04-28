import React from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import defaultImg from '../../images/default-profile.jpg'
import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isStylist: false,
            isLoggedIn: false,
            loginFail: false,
            email: '',
            password: '',
            profile_img: {defaultImg},
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value 
        })
    };

    // Separate APIs for stylist and user. 
    // Current Bug: this.props.history.push() throws typeError-history is undefined
    handleSubmit = e => {
    e.preventDefault();
        if(this.state.isStylist === false){
            axiosWithAuth()
            .post('/auth/login/user', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.user.id);
                localStorage.setItem('usertype', res.data.user.usertype);
                this.setState({isLoggedIn: true})
                this.props.history.push(`/users/${res.data.user.id}/dash`)
            })
            .catch(err=> {
                this.setState({loginFail: true})
                console.log(err, err.message)
            }) 
        } 
        else{
            axiosWithAuth()
            .post('/auth/login/stylist', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.stylist.id);
                localStorage.setItem('usertype', res.data.stylist.usertype);
                this.setState({isLoggedIn: true})
                this.props.history.push(`/stylists/${res.data.stylist.id}/dash`)
            })
            .catch(err=> {
                this.setState({loginFail: true})
                console.log(err, err.message)
            }) 
        }
    };
    
     
    render(){
        let loginError;
        if (this.state.loginFail === true){
            loginError = <p className='login-fail'>Email or Password Incorrect</p>
        }

        return (
            <LoginForm className='login-form' onSubmit={this.handleSubmit}>
                <h3>Welcome Back</h3>
                <input 
                    type='text' 
                    name='email' 
                    value={this.email} 
                    placeholder="Email" 
                    onChange={this.handleChange}
                />
                <input 
                    type='password' 
                    name='password' 
                    value={this.password} 
                    placeholder="Password" 
                    onChange={this.handleChange}
                />
                <div className='check-stylist'>
                    I'm a Stylist
                    <input 
                        type='checkbox'
                        label='isStylist'
                        name='isStylist'
                        value={'true'}
                        onClick={this.handleChange}
                    />
                </div>
                <button type='submit' onClick={this.handleSubmit}>Login</button>
                {loginError}
                <Link to='/signup'><p>Don't have an account?</p></Link> 
            </LoginForm>   
    )
}};

export default Login;


const LoginForm = styled.form`
    width: 40vw;
    height: 50vh;
    margin: auto;
    display:flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    align-content: center;
    padding: 20px;
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