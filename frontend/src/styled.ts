import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    border: 0;
  }

  body, input, input::placeholder, span {
    font-family: "Roboto", sans-serif;
  }
  
  a, button, a:hover, a:active, a:focus, input, body {
    outline: 0;
  }
`;

export default GlobalStyle;
