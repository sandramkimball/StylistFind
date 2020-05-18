import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png'

function Nav(props) {
    const [user, setUser] = useContext(UserContext)
    const userId = localStorage.getItem('id')
    const userType = localStorage.getItem('usertype')

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
                <NavLink to='/search' className='search-btn'><p>Search</p></NavLink>                

                {userType && userType === 'user' && (
                    <NavLink to={`/users/${userId}/dash`}><p>Dashboard</p></NavLink>
                )}

                {userType && userType === 'stylist' && (
                    <NavLink to={`/stylists/${userId}/dash`}><p>Dashboard</p></NavLink>
                )}

                {userType === null && (
                    <NavLink to='/login'><p>Login</p></NavLink>
                )}

                {userType === null && (
                    <NavLink to='/login'><p>Signup</p></NavLink>
                )}

                {userType && (
                    <NavLink to='/' onClick={logout}><p>Logout</p></NavLink>
                )}                
            </div>
        </NavBar>
    )
}

export default withRouter(Nav);

const NavBar = styled.nav`
    width: 100%;
    background: #ef6978;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7vh;
    justify-content: space-between;
    a{
        text-decoration: none;
        font-weight: 600;
        padding: 0 5px;
        height: 7vh;
        min-width: 7vh;
        color: #000;
        :hover{background: #ff8794}
    }
    p{align-self: center}
    div{
        display: flex;
        font-size: 1.2rem;
        margin: 0 2vw;
    }
    .logo{        
        height: 6vh;
        margin: 0 auto;
    }
`;
