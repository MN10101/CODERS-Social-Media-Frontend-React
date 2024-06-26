import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styled from 'styled-components';

const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
    } catch (error) {
      setMessage('Error sending password reset email');
      console.error('Password reset error:', error);
    }
  };

  return (
    <Frame>
      <Container>
        <h2>Reset Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleReset}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </Container>
    </Frame>
  );
};

export default PasswordReset;
