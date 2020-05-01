import React from 'react';
import styled from 'styled-components';
import SignUpForm from './SignUpForm';
import salonChair from '../../images/salon-chair.jpg';

class SignUpPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alreadyUser: true,
        }
    }

    render(){      
        return(
            <Page className='login-pg'>
                <div>
                   <SignUpForm />             
                </div>
                <img src={salonChair} alt='salon chair and makeup light'/>
            </Page>

        )
    }
}

export default SignUpPage;

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