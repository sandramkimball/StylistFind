import React from 'react';
import styled from 'styled-components';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alreadyUser: true
        }
        this.handleUser = this.handleUser.bind(this);
    }

    handleUser(){
        this.setState({alreadyUser: true ? false : true})
    }
    
    render(){
        const isAlreadyUser = this.state.alreadyUser;
        let form;
        let loginOrSignup;

        if (isAlreadyUser === true){
            form = <LoginForm history={this.props.history}/>;
            loginOrSignup = <p onClick={this.handleUser}>Signup</p>
        } else {
            form = <SignUpForm history={this.props.history}/>;
            loginOrSignup = <p onClick={this.handleUser}>I'm Already a Member</p>
        }

        return(
            <Page>
                <div>
                   {form}
                   {loginOrSignup}              
                </div>
                <img src='https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80' alt='salon chair and makeup light'/>
            </Page>

        )
    }
}

export default LoginPage;

const Page = styled.div`
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
    p{
        cursor: pointer;
        color: gray;
    }
`;