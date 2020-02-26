import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from './contexts/UserContext';

function Nav(props) {
    const {user, dispatch} = useUserContext();

    const logout = e => {
        localStorage.removeItem('token');
        props.history.push('/')
    };

    return(
        <NavBar>
            <NavLink to='/'>
                <Logo>Stylist Find</Logo>
            </NavLink>
            <div>
                <NavLink to='/search'>Search</NavLink>
                <NavLink to='/users/:id/dash'>User</NavLink>
                <NavLink to='/stylists/:id/dash'>Stylist</NavLink> 
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
                {user.isLoggedIn && (
                    <NavLink to='/' onClick={logout}>Logout</NavLink>
                )}
                {!user.isLoggedIn && (
                    <NavLink to='signup/'>Signup</NavLink>
                )}
            </div>
        </NavBar>
    )
}

export default withRouter(Nav);

const Logo = styled.h1`
    font-size: 32px;
    margin: 0 auto;
    padding: 5px 20px;
    color: #faa41a;
    font-family: 'Dancing Script', cursive; 
`;

const NavBar = styled.nav`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: #faa41a;
        font-weight: 600;
        margin: 0 5px;
    }
    div{
        justify-content: space-between;
        display: flex;
        font-size: 1.2rem
    }
`;

const LogOutBtn = styled.p`
  cursor: pointer;
  margin-left: 30px;
  :hover {
    color: #83c441;
  }
`;