import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#121212')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    transition: all 0.3s linear;
  }

  a {
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  }

  .post {
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  }

  .sidebar {
    background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#222')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  }
`;

export default GlobalStyle;
