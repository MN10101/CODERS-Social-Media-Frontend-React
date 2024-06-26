import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserWithEmailAndPassword } from '../firebaseConfig';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    profilePicture: '',
    country: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Registering user...');
      await registerUserWithEmailAndPassword(formValues);
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <RegisterContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
        />
        <Input
          type="date"
          placeholder="Birth Date"
          name="birthDate"
          value={formValues.birthDate}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Picture URL"
          name="profilePicture"
          value={formValues.profilePicture}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Country"
          name="country"
          value={formValues.country}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={formValues.city}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={formValues.postalCode}
          onChange={handleChange}
        />
        <Input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </RegisterContainer>
  );
};

export default Register;
