import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function LoginLanding() {
    return (
        <Landing className='login-landing'>
            <LoginForm/>
            <SignUpForm/>
        </Landing>
    )
}

export default LoginLanding;

const Landing = styled.section`
    width: 70vw;
    height: 60vh;
    margin: 10vh auto;
    background: #fff;
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0px 4px 8px gray;
    border-radius: 4px;
`;