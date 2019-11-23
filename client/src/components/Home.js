import React from "react";
import { Route, Redirect } from "react-router-dom";
import Styled from "styled-components";
import Login from './forms/Login'
import SignUp from './forms/SignUp';


export default function Home() {
  return (
    <div>
      <Body>
        <Section1>
          <img src='https://images.unsplash.com/photo-1497433550656-7fb185be365e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' alt='curly blonde hair and green leaves'/>
          <h2>StylistFind</h2>
        </Section1>
        <Section2>
          <div>
            <Login/>
            <RegisterBtn>
              <h3>Or Sign Up Here</h3>
            </RegisterBtn>
          </div>
        </Section2>
      
     </Body>
    </div>
  );
}


const Body = Styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  dislay: flex;
  flex-direction: column;
  align-content: space-between;
`;

const Section1 = Styled.section`
  height: 60vh;
  width: 100vw;
  img{
    object-fit: cover;
    position: relative;
    // left: 0;
    height: 100%;
    width: 100vw
  }
  h2{
    z-index: 5;
    position: absolute;
    left: 50px;
    top: 150px;
    font-size: 3.5rem;
    background: #ffffffc0;
    padding: 5px;
  }
`;

const Section2 = Styled.section`
  margin: 20px auto;
  align-items: center;
  div{
    display: flex;
    width: 90%;
    justify-content: space-evenly;
  }
`;

const RegisterBtn = Styled.div`
  width: 40vw;
  align-items: center;
  h3{
    font-size: 3rem;
    :hover{
      transform: scale(1.1);
      color: #80808095; 
      cursor: pointer 
    }
  }
`;

