import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
    p,h1{
      font-family: 'Roboto', sans-serif;  
    }
    button{
      cursor: pointer;
      width: 200px;
      
    }
   

    `;
