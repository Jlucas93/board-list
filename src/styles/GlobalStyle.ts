import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  body {
    color: ${({ theme }) => theme.text};
    background-color:${({ theme }) => theme.background};
  }
  
  html{ 

    font-family: "Roboto", sans-serif;
  }

  button {
    cursor:pointer;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

`;

export default GlobalStyle;
