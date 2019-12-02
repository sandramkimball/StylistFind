import React from "react";
import {  NavLink } from "react-router-dom";
import Styled from "styled-components";
import Login from './forms/Login'
// import SignUp from './forms/SignUp';


export default function Home() {
  return (
    <div>
      <Body>
        <Section1>
          <img src='https://images.unsplash.com/photo-1497433550656-7fb185be365e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' alt='curly blonde hair and green leaves'/>
          <SearchBar>
            <h1>Find Stylists</h1>
            <form >
                <input
                id='search_input'
                type='text'
                name='textfield'
                placeholder='Enter location, salon or stylist name...'/>
            </form>
          </SearchBar>
        </Section1>
        <Section2>
          <div>
            <Login/>
            <RegisterBtn>
              <NavLink to='/signup'><h3>Or Sign Up Here</h3></NavLink>
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
    height: 100%;
    width: 100vw
  }
`;

const SearchBar = Styled.div`
  width: 60%;
  margin: 10px auto;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 5;
  position: absolute;
  top: 30vh;
  left: 20vw;
  border-radius: 5px 3px;
  border: 1px solid gray;
  h1{font-size: 2.75rem; padding: 0; margin: 0 }
  form{
    border: none;
    height: 30px;
    margin-left: 20px;
    width: 60%
    button{
        background: none;
        border: 1px solid black;
        padding: 7px;
    }
    input{
        border: none;
        height: 40px;
        width: 100%;
        text-align: left;
        border-bottom: 1.5px solid gray;
    }
  }
`;

const Section2 = Styled.section`
  margin: 20px auto;
  align-items: center; 
  div{
    display: flex;
    width: 90%;
    justify-content: space-evenly;
    a{text-deoration: none} 
  }
`;

const RegisterBtn = Styled.div`
  width: 40vw;
  align-items: center;
  a{text-decoration: none;}
  h3{
    font-size: 3rem;
    color: purple;
    :hover{
      transform: scale(1.1);
      color: #80808095; 
      cursor: pointer;
    }
  }
`;




