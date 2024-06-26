import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);  /* Add blur effect */
  z-index: 1000;
  
  p {
    margin: 0;
    font-size: 1.5rem;  /* Increase font size */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 A3M</p>
    </FooterContainer>
  );
};

export default Footer;