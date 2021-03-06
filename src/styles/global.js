import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
  
  html, body {
    font-family: 'Titillium Web', sans-serif;
    background: ${({ theme }) => theme.colors.primary[100]};
  }
`;

export default GlobalStyle;
