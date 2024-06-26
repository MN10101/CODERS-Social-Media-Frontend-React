import React from 'react';
import styled from 'styled-components';

const IframeContainer = styled.div`
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

const Iframe = styled.iframe`
  width: 80%;
  height: 80%;
  border: none;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GameWindow = ({ url, onClose }) => {
  if (!url) return null; // Ensure the URL is provided

  return (
    <IframeContainer>
      <Iframe src={url} allowFullScreen />
      <CloseButton onClick={onClose}>Close</CloseButton>
    </IframeContainer>
  );
};

export default GameWindow;