import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  padding: 10rem;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  text-align: center;
  overflow: hidden;
  transform: scale(0);
  animation: inflate 1s forwards;

  @keyframes inflate {
    0% {
      width: 100px;
      height: 100px;
      transform: scale(0);
    }
    100% {
      width: 300px;
      height: 300px;
      transform: scale(1);
      border-radius: 50%;
    }
  }
`;

const ModalContentExpanded = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 1rem;
  margin-top: -2rem;
  animation: expandContent 1s forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @keyframes expandContent {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const MemberInfoModal = ({ member, onClose, theme }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!member) return null;

  const {
    firstName = '',
    lastName = '',
    user = {},
    profilePicture = '',
    city = '',
    country = '',
    phone = '',
    formattedBirthDate = '',
    postalCode = ''
  } = member;

  const { username = '', email = '' } = user;

  return (
    <ModalContainer>
      <ModalContent theme={theme} ref={modalRef}>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <ModalContentExpanded>
          <img
            src={profilePicture}
            alt={`${firstName} ${lastName}`}
            style={{ borderRadius: '50%', width: '80px', height: '80px', marginBottom: '1rem' }}
          />
          <h2>{firstName} {lastName}</h2>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>City:</strong> {city}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Birth Date:</strong> {formattedBirthDate}</p>
          <p><strong>Postal Code:</strong> {postalCode}</p>
        </ModalContentExpanded>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemberInfoModal;
