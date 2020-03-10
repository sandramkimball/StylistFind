import React from 'react';
import styled from 'styled-components';
// import PrivateRoute from '../PrivateRoute';
import axiosWithAuth from '../utilis/axiosWithAuth';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isStylist: false,
            isLoggedIn: false,
            loginFail: false,
            // credentials: {
                username: '',
                password: '',
            // }
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
        .post('/auth/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res=> {
            localStorage.setItem('token', res.data.payload);
            this.setState({isLoggedIn: true})
            this.props.history.push('/search')
        })
        .catch(err=> {
            this.setState({loginFail: true})
            console.log('LOGIN ERROR', err)
        }) 
    };
     
    render(){
        // if(localStorage.getItem('token')) {return <Redirect to='/users/:id/dash'/>}
        if(this.state.isLoggedIn === true) {
            console.log('Login successful.')
        }
        let loginError;
        if (this.state.loginFail === true){
            loginError =  <p className='login-fail' >Username or Password Incorrect</p>
        }

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
                    {loginError}
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
    .login-fail p{
        color: red,
        font-size: .5rem;
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
    h3{
        margin: 0; 
        font-size: 2rem; 
        font-family: 'Dancing Script', cursive
    }
    
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