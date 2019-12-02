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
          <h2>StylistFind</h2>
        </Section1>
        <Section2>
          <div>
            <Login/>
            <RegisterBtn>
              <NavLink to='/signup'><h3>Or Sign Up Here</h3></NavLink>
            </RegisterBtn>
          </div>
        </Section2>
        <Section3>
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
        </Section3>
      
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

const Section3 = Styled.div`
  height: 50vh;
  width: 90vw;
  margin: 0 auto;
  padding: 20px 0;
  // border-top: 2px solid black;
  // border-bottom: 2px solid black;
  background: url('https://cdn.stocksnap.io/img-thumbs/960w/JHCQ2KZPR0.jpg');
  background-size: cover;
  h4{
    color: purple;
    text-align: left;
  }
`;

const SearchBar = Styled.div`
    width: 80%;
    margin: 10px auto;
    background: #fff;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    form{
        border: none;
        height: 30px;
        margin-left: 20px;
        width: 35%

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
