import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

function Footer(props) {

    return(
        <FooterBar>
            <NavLink to='/'>
                <img src='https://image.flaticon.com/icons/png/512/41/41463.png' alt='clipart of scissors and a comb'/>
            </NavLink>
            <p>copyright Sandy 2020</p>
            <NavLink to='policy'><p>Privacy Policy</p></NavLink>
        </FooterBar>
    )
}

export default withRouter(Footer);

const FooterBar = styled.nav`
    width: 98%;
    position: relative;
    bottom: 0;
    margin: auto;
    margin-top: 5vh;
    padding: 10px 0;
    align-self: center
    img{height: 35px}
    p{margin: 0 0; font-size: .5rem}
    bottom: 0
`;
