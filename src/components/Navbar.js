import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaUserFriends, FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => (theme === 'light' ? '#000' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? 'white' : 'lightgray')};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in-out;
  }

  svg {
    margin-right: 0.5rem;
    transition: color 0.3s ease-in-out;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ show }) => (show ? 'flex' : 'none')};
  }

  .home-icon, .home-link:hover {
    color: #ff6347; /* Tomato */
  }

  .profile-icon, .profile-link:hover {
    color: #ffa500; /* Orange */
  }

  .members-icon, .members-link:hover {
    color: #32cd32; /* Lime Green */
  }

  .friends-icon, .friends-link:hover {
    color: #9370db; /* Medium Purple */
  }

  .logout-icon, .logout-link:hover {
    color: #ff0000; /* Red */
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffa500; /* Orange */
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
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/'); // Navigate to the home page
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('posts'); // Clear posts from LocalStorage on logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <NavbarContainer theme={theme}>
      <Logo>CODERS</Logo>
      <ToggleButton onClick={() => setShowNavLinks(!showNavLinks)}>
        {showNavLinks ? <FaTimes /> : <FaBars />}
      </ToggleButton>
      <NavLinks show={showNavLinks}>
        <a href="/" className="home-link" onClick={handleHomeClick}><FaHome className="home-icon" /> Home</a>
        <Link to="/profile" className="profile-link"><FaUser className="profile-icon" /> Profile</Link>
        <Link to="/members" className="members-link"><FaUsers className="members-icon" /> Members</Link>
        <Link to="/friends" className="friends-link"><FaUserFriends className="friends-icon" /> Friends</Link>
        {currentUser && (
          <a onClick={handleLogout} className="logout-link" style={{ cursor: 'pointer' }}><FaSignOutAlt className="logout-icon" /> Logout</a>
        )}
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
