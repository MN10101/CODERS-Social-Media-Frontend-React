import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 250px;
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: none;
    padding: 0.5rem;
    display: ${({ show }) => (show ? 'block' : 'none')};
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => (theme === 'light' ? '#00796b' : '#80cbc4')};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GameLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-decoration: none;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #333;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const AppLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-weight: bold;
  cursor: pointer;
  flex: 1 1 45%;

  &:hover {
    color: #333;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const AppName = styled.span`
  text-align: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 1rem;
  }
`;

const LeftSidebar = ({ onGameClick }) => {
  const { theme } = useContext(ThemeContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAppClick = (url, embed) => {
    if (embed) {
      onGameClick(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <ToggleButton onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </ToggleButton>
      <SidebarContainer theme={theme} show={showSidebar}>
        <Title theme={theme}>Popular Games</Title>
        <GameLink theme={theme} onClick={() => onGameClick("https://miniroyale2.io")}>
          <img src="4.jpg" alt="MiniRoyale2" />
          MiniRoyale2
        </GameLink>
        <GameLink theme={theme} onClick={() => onGameClick("https://slither.io")}>
          <img src="3.png" alt="Slither" />
          Slither
        </GameLink>
        <GameLink theme={theme} onClick={() => onGameClick("https://www.epicgames.com/fortnite/en-US/home")}>
          <img src="2.jpg" alt="Fortnite" />
          Fortnite
        </GameLink>
        <GameLink theme={theme} onClick={() => onGameClick("https://krunker.io")}>
          <img src="1.jpg" alt="Krunker" />
          Krunker
        </GameLink>
        
        <Title theme={theme}>Popular Apps</Title>
        <AppsContainer>
          <AppLink theme={theme} onClick={() => handleAppClick("https://openai.com/chatgpt/", true)}>
            <img src="chatgpt.png" alt="ChatGPT" />
            <AppName>ChatGPT</AppName>
          </AppLink>
          <AppLink theme={theme} onClick={() => handleAppClick("https://workspace.google.com/intl/de/products/calendar/", true)}>
            <img src="google-calendar.png" alt="Google Calendar" />
            <AppName>Google Calendar</AppName>
          </AppLink>
        </AppsContainer>
      </SidebarContainer>
    </>
  );
};

export default LeftSidebar;
