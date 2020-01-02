import React from 'react';
import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom';

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
            .post('/api/auth/login', this.state)
            .then(res=> {
                console.log(res.data)
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/search')
            })
            .catch(err=> console.log('LOGIN ERROR', err.res))
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

// LoginForm.propTypes = {
//     login: React.PropTypes.func.isRequired
// }

// LoginForm.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }

export default Login;


const LoginPage = styled.div`
    width: 90vh;
    height: 80vh;
    margin: auto;
    display:flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    img{
        height: 100%;
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
    p{font-size: .8rem; text-align: right; }
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