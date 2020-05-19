import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

function Footer(props) {

    return(
        <FooterBar>
            <p>copyright Sandy 2020</p>
            <NavLink to='/'>
                <img src='https://image.flaticon.com/icons/png/512/41/41463.png' alt='clipart of scissors and a comb'/>
            </NavLink>
            <NavLink to='policy'><p>Privacy Policy</p></NavLink>
        </FooterBar>
    )
}

export default withRouter(Footer);

const FooterBar = styled.section`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray;
    margin: auto;
    padding: 10px 0;
    align-self: center;
    img{
        height: 35px;
        padding: 0 5px;
        margin: auto;
    }
    p{
        margin: 0 0; 
        font-size: .75rem
    }
`;
