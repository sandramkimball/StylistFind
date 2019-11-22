import React, { useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from './contexts/UserContext';

function Nav(props) {
    const {user, dispatch} = useUserContext();

    useEffect(()=> {
        if(localStorage.getItem('token')){
            dispatch({type: 'LOGIN_TRUE'});
        }
    }, []);

    return(
        <NavBar>
            <img alt='logo purple girl' src='https://img.pngio.com/hair-salon-clipart-hair-stylist-png-hair-extension-logo-ideas-736-hair-stylist-png-images-736_797.jpg'/>

            {props.location.pathname === '/signup' && (
                <NavLink to='/login'>Login</NavLink>
            )}

            {props.location.pathname === '/login' && (
                <NavLink to='/signup'>Signup</NavLink>
            )}

            {localStorage.getItem('usertype') === 'stylist' && (
                <NavLink to='/stylist-dash'>Dash</NavLink>
            )}

            {localStorage.getItem('usertype') === 'customer' && (
                <NavLink to='/customer-dash'>Dash</NavLink>
            )}

          <NavLink to='/search' >Search</NavLink>
          <NavLink to='/customer-dash'>Customer</NavLink>
          <NavLink to='/stylist-dash'>Stylist</NavLink> 
          <NavLink to='/login'>Login</NavLink>

          
          {user.isLoggedIn && (
          <LogOutBtn
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('usertype');
              dispatch({ type: 'LOGOUT' });
              props.history.push('/login');
            }}>
            Logout
          </LogOutBtn>
        )}
        </NavBar>
    )
}

export default withRouter(Nav);


const NavBar = styled.nav`
    background: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40px;
    justify-content: space-evenly;
    a{
        text-decoration: none;
        color: #000;
    }
    img{
        height: 100px;
    }
`;

const LogOutBtn = styled.p`
  cursor: pointer;
  margin-left: 30px;
  :hover {
    color: #83c441;
  }
`;