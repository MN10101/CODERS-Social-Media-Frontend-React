import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Friends from './pages/Friends';
import RightSidebar from './components/RightSidebar';
import LeftSidebar from './components/LeftSidebar';
import GameWindow from './components/GameWindow';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTopButton from './components/ScrollToTopButton';
import GlobalStyle from './components/GlobalStyles';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AuthContext } from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  margin: 0 250px;
  min-height: calc(100vh - 7rem);
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 0;
    padding-top: 2rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const App = () => {
  const [gameUrl, setGameUrl] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const handleGameClick = (url) => {
    setGameUrl(url);
  };

  const handleAppClick = (url, embed) => {
    if (embed) {
      setGameUrl(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseGameWindow = () => {
    setGameUrl(null);
  };

  return (
    <StyledThemeProvider theme={{ mode: theme }}>
      <GlobalStyle theme={theme} />
      <Router>
        {currentUser && <Navbar />}
        {currentUser && <LeftSidebar onGameClick={handleGameClick} />}
        {currentUser && <RightSidebar />}
        <MainContainer>
          <ContentWrapper>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  currentUser ? <Home /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <ProtectedRoute>
                    <Members />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/friends"
                element={
                  <ProtectedRoute>
                    <Friends />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ContentWrapper>
          {gameUrl && <GameWindow url={gameUrl} onClose={handleCloseGameWindow} />}
        </MainContainer>
        {currentUser && <Footer />}
        <ScrollToTopButton />
      </Router>
    </StyledThemeProvider>
  );
};

export default App;