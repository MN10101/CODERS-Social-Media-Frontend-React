import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, registerUserWithEmailAndPassword } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import styled from 'styled-components';

const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(35px);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 15);
  width: 350px;
`;

const IntroText = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  background-color: #000;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    background-color: #333;
  }
`;

const SwitchFormText = styled.p`
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const PasswordReset = ({ setMessage }) => {
  const [email, setEmail] = useState('');

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
    <Form onSubmit={handleReset}>
      <div>
        <label>Email:</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit">Reset Password</Button>
    </Form>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await registerUserWithEmailAndPassword(email, password, username);
      }
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Frame>
      <Container>
        <IntroText>
          Welcome to CODERS, the ultimate social media app for all! Connect,<br></br> share, and collaborate with like-minded individuals.<br></br>  Join us today and enjoy your journey!
        </IntroText>
        {message && <p>{message}</p>}
        {showPasswordReset ? (
          <>
            <PasswordReset setMessage={setMessage} />
            <SwitchFormText onClick={() => setShowPasswordReset(false)}>
              Back to Login
            </SwitchFormText>
          </>
        ) : (
          <Form onSubmit={handleAuth}>
            {!isLogin && (
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
            <SwitchFormText onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'No account? Register here' : 'Have an account? Login here'}
            </SwitchFormText>
            <SwitchFormText onClick={() => setShowPasswordReset(true)}>
              Forgot Password?
            </SwitchFormText>
          </Form>
        )}
      </Container>
    </Frame>
  );
};

export default Login;
