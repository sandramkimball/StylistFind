import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, NavLink, Redirect} from 'react-router-dom';


//COMPONENTS
// import { useUserContext } from '../contexts/UserContext';
// import { useDataContext } from '../contexts/DataContext';
// import PrivateRoute from '../PrivateRoute';
import axiosWithAuth from '../utilis/axiosWithAuth';



class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
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

    handleSubmit = e => {
        e.preventDefault();
            this.setState({isLoading: true});
            axiosWithAuth()
            .post('/api/auth/login', this.state)
            .then(
                (res)=> console.log(res.data),
                (res)=> this.context.router.push(`api/search`),
                (err)=> this.setState({ isLoading: false})
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
    )};

    

    logout = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/api/login', !this.state)
        .then(
            (res)=> this.context.router.push('/'),
            (err)=> this.setState({isLoading: false})
        )
        .catch(err=>console.log('You are logged out', err))
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
        const {username, password, isLoading} = this.state;
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

                    <div>
                        <button type='submit' onClick={this.handleSubmit}>Login</button>
                    </div>
                </LoginForm>
            </LoginPage>
        )
}};

// LoginForm.propTypes = {
//     login: React.PropTypes.func.isRequired
// }

// LoginForm.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }

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
        font-size: 1.25rem;
        border: 1px solid black;
        padding: 10px 20px;
        background: none;
        text-decoration: none;
        color: black;
        :hover{transform: scale(1.025); color: #80808095; cursor: pointer}
    }
`;