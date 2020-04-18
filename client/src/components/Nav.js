import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png'

function Nav(props) {

    const logout = e => {
        localStorage.clear();
        props.history.push('/')
    };

    return(
        <NavBar className='navbar'>
            <NavLink to='/'>
                <img src={logo} className='logo' alt='hairstylist scissors and comb clipart'/>
            </NavLink>
            <div>
                <NavLink to='/search' className='search-btn'>Search</NavLink>                

                {localStorage.getItem('usertype') === 'user' && (
                    <NavLink to={`/users/${localStorage.getItem('id')}/dash`}>User</NavLink>
                )}

                {localStorage.getItem('usertype') === 'stylist' && (
                    <NavLink to={`/stylists/${localStorage.getItem('id')}/dash`}>Stylist</NavLink>
                )}

                {!localStorage.getItem('usertype') && (
                    <NavLink to='/login'>Login</NavLink>
                )}

                {!localStorage.getItem('usertype') && (
                    <NavLink to='/signup'>Signup</NavLink>
                )}

                {localStorage.getItem('usertype') && (
                    <NavLink to='/' onClick={logout}>Logout</NavLink>
                )}                
            </div>
        </NavBar>
    )
}

export default withRouter(Nav);

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
        font-weight: 600;
        margin: 0 5px;
        color: #000;
    }
    div{
        justify-content: space-between;
        display: flex;
        font-size: 1.2rem
    }
    .logo{        
        height: 7vh;
        margin: 0 auto;
    }
`;
