import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600|Source+Sans+Pro&display=swap');

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }

  h1, h2, h3, h4 {
    font-family: 'Open Sans', sans-serif;
  }
`;

export default GlobalStyle;