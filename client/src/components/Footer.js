import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

function Footer(props) {

    const logout = e => {
        localStorage.clear();
        props.history.push('/')
    };

    return(
        <FooterBar>
            <NavLink to='/'>
                <img src='https://image.flaticon.com/icons/png/512/41/41463.png' alt='clipart of scissors and a comb'/>
            </NavLink>
            <p>copyright Sandy 2020</p>
        </FooterBar>
    )
}

export default withRouter(Footer);

const FooterBar = styled.nav`
    width: 98%;
    margin: auto;
    padding: 10px;
    align-self: center
    img{height: 40px}
    p{margin: 0 0; font-size: .75rem}
    position: absolute;
    bottom: 0
`;
