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
                <NavLink to='/search' className='search-btn'><p>Search</p></NavLink>                

                {user && user.usertype === 'user' && (
                    <NavLink to={`/users/${user_id}/dash`}><p>Dashboard</p></NavLink>
                )}

                {user && user.usertype === 'stylist' && (
                    <NavLink to={`/stylists/${user.id}/dash`}><p>Dashboard</p></NavLink>
                )}

                {user === null && (
                    <NavLink to='/login'><p>Login</p></NavLink>
                )}

                {user === null && (
                    <NavLink to='/signup'><p>Signup</p></NavLink>
                )}

                {user && (
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
        width: 7vh;
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
