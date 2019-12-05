import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from './contexts/UserContext';

function Nav(props) {
    const {user, dispatch} = useUserContext();

    // useEffect(()=> {
    //     if(localStorage.getItem('token')){
    //         dispatch({type: 'LOGIN_TRUE'});
    //     }
    // }, []);

    return(
        <NavBar>
            <NavLink to='/'>
                <Logo>Stylist Find</Logo>
            </NavLink>
            <div>
                {/* {props.location.pathname === '/signup' && (
                    <NavLink to='/login'>Login</NavLink>
                )}

                {props.location.pathname === '/login' && (
                    <NavLink to='/signup'>Signup</NavLink>
                )}

                {localStorage.getItem('usertype') === 'stylist' && (
                    <NavLink to='/stylists/:id/dash'>Dash</NavLink>
                )}

                {localStorage.getItem('usertype') === 'user' && (
                    <NavLink to='/users/:id/dash'>Dash</NavLink>
                )} */}

            <NavLink to='/search'>Search</NavLink>
            <NavLink to='/users/:id/dash'>User</NavLink>
            <NavLink to='/stylists/:id/dash'>Stylist</NavLink> 
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
        </div>
        </NavBar>
    )
}

export default withRouter(Nav);

const Logo = styled.h1`
    // background: linear-gradient(to bottom right, #a473aa, #faa41a);
    font-size: 32px;
    margin: 0 auto;
    padding: 5px 20px;
    color: #faa41a;
    font-family: 'Dancing Script', cursive; 
`;

const NavBar = styled.nav`
    background: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    justify-content: space-between;
    padding: 0 10px;
    a{
        text-decoration: none;
        color: #faa41a;
        font-weight: 600;
    }
    img{
        height: 100px;
    }
    div{
        width: 25%;
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