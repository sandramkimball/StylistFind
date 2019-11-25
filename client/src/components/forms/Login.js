import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';


//COMPONENTS
import { useUserContext } from '../contexts/UserContext';
import { useDataContext } from '../contexts/DataContext';
import PrivateRoute from '../PrivateRoute';
import axiosWithAuth from '../utilis/axiosWithAuth';
import validateInput from './Validator';



class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };


    // const { user, stylist, dispatch } = useUserContext();
    // const { dispatchData } = useDataContext();

    handleChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    };

    isValid(){
        const {errors, isValid} = validateInput(this.state);
        if(!isValid){
            this.setState({errors});
        }
        return isValid
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.isValid()){
            this.setState({errors: {}, isLoading: true});
            axiosWithAuth()
            .post('/api/auth/login', this.state)
            .then(
                (res)=> this.context.routher.push('/dashboard'),
                (err)=> this.setState({errors: err.data.errors, isLoading: false})
            )
        }
            // const userId = (props.match.params.id);
            // const userData = props.data.users.find(el => el.id === userId);
            // const stylistData = props.data.stylists.find(el => el.id === userId);
            // if(userId.ussertype === 'user'){
            //     dispatchData({ type: 'IMPORT_USER_DATA', payload: userData});
            //     dispatchData({ type: 'SET_USER', payload: userData});
            // } else {
            //     dispatchData({ type: 'IMPORT_STYLIST_DATA', payload: stylistData});
            //     dispatchData({ type: 'SET_STYLIST', payload: stylistData});
            // }    
    };

    

    logout = e => {
        // let storage = props.match.headers.authorization;
        // e.preventDefault();
        // axiosWithAuth()
        // .post('/api/login', this.state.credentials)
        // .then(res=> {
        //     storage.setItem('token', !res.data.payload);
        //     this.props.history.push('/login');
        // })
        // .catch(err=>console.log('You are logged out', err))
    };

    // let handleSubmit = e => {
    //     e.preventDefault();

    //         axiosWithAuth()
    //         .post('/api/auth/login', this.state.credentials)
    //         .then(res=> {
    //             storage.setItem('token', res.data.payload);
    //             if(res.data.usertype === 'stylists'){
    //                 setStylist(res.data)
    //             } else if (res.data.usertype === 'user'){
    //                 setUser(res.data)
    //             } 
    //         })
    //         .catch(err=>console.log('Username or password incorrect.', err))
    // };

    //     if(users.find(
    //         obj=>
    //             obj.username === credentials.username &&
    //             obj.password === credentials.password
    //         )
    //     ){
    //         storage.setItem('token', 'user' + credentials.username);
    //         storage.setItem('usertype', 'user');
    //         dispatch({
    //             type: 'LOGIN_SUCCESS',
    //             usertype: 'user',
    //             username: credentials.username,
    //         });
    //         dispatch({type: 'LOGIN_USER'});
    //         props.history.push(`/user-dash/${props.user.id}`);
    //     } else if (
    //         this.stylists.find(
    //         obj =>
    //             obj.username === credentials.username &&
    //             obj.password === credentials.password,
    //         )
    //     ){
    //         localStorage.setItem('token', 'stylist' + credentials.username);
    //         localStorage.setItem('usertype', 'stylist');
    //         dispatch({
    //             type: 'LOGIN_SUCCESS',
    //             usertype: 'stylist',
    //             username: credentials.username,
    //         });
    //         dispatch({type: 'LOGIN_STYLIST'});
    //         props.history.push(`/stylist-dash/${props.stylist.id}`);
    //     } else {
    //         dispatch({type: 'LOGIN_FAILURE'})}
    // };
     
    render(){
        const {error, username, password, isLoading} = this.state;
    return (
            <LoginPage>
                <LoginForm onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input 
                        type='text' 
                        name='username' 
                        value={this.username} 
                        placeholder="username" 
                        error={errors.username}
                        onChange={this.handleChange}
                    />

                    <input 
                        type='password' 
                        name='password' 
                        value={this.password} 
                        placeholder="password" 
                        errors={errors.password}
                        onChange={this.handleChange}
                    />

                    <div>
                        <button type='submit' onClick={this.handleSubmit}>Login</button>
                        {/* {token && (<button type='submit' onClick={this.logout}>Logout</button>)} */}
                        <NavLink to='/signup'><button>Signup</button></NavLink>
                    </div>
                </LoginForm>
            </LoginPage>
        )
}};

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default connect(null, {login})(Login);


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