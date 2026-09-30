import { createGlobalStyle } from 'styled-components';

// Samo za samostalni deploy. Na rentl.io se koristi postojeći GlobalStyle weba.
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${({ theme }) => theme.colors.white}; }
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.navy};
    -webkit-font-smoothing: antialiased;
  }
  button { font-family: inherit; }
  img { max-width: 100%; }
`;

export default GlobalStyle;
