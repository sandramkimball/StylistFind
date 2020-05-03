import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png'

function Nav(props) {
    const [user, setUser] = useContext(UserContext)
    const user_id = localStorage.getItem('id')

    const logout = e => {
        localStorage.clear();
        setUser(null)
        props.history.push('/')
    };

    return(
        <NavBar className='navbar'>
            <NavLink to='/'>
                <img src={logo} className='logo' alt='hairstylist scissors and comb clipart'/>
            </NavLink>
            <div>
                <NavLink to='/search' className='search-btn'>Search</NavLink>                

                {user && user.usertype === 'user' && (
                    <NavLink to={`/users/${user_id}/dash`}>Dashboard</NavLink>
                )}

                {user && user.usertype === 'stylist' && (
                    <NavLink to={`/stylists/${user.id}/dash`}>Dashboard</NavLink>
                )}

                {user === null && (
                    <NavLink to='/login'>Login</NavLink>
                )}

                {user === null && (
                    <NavLink to='/signup'>Signup</NavLink>
                )}

                {user && (
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
