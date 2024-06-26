import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 10px 15px;
  font-size: 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    background-color: #333;
  }
`;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <ScrollButton onClick={scrollToTop} visible={visible}>
      <FaArrowUp />
    </ScrollButton>
  );
};

export default ScrollToTopButton;
