import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { auth } from '../firebaseConfig';
import { fetchUserProfile, updateUserProfile } from '../api';
import { ThemeContext } from '../contexts/ThemeContext';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
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
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
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

const SuccessMessage = styled.div`
  color: green;
  margin-top: 0.5rem;
`;

const ProfileInfo = styled.div`
  margin-top: 1rem;
`;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    username: '',
    email: '',
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
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const profileData = await fetchUserProfile(user.uid);
          setUserInfo({
            ...profileData,
            id: user.uid,
            username: user.displayName,
            email: user.email
          });
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await updateUserProfile(userInfo);
      setSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Failed to update profile.');
    }
  };

  return (
    <ProfileContainer theme={theme}>
      <h2>Complete Your Profile</h2>
      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={userInfo.username}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userInfo.firstName}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userInfo.lastName}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="date"
            name="birthDate"
            placeholder="Birth Date"
            value={userInfo.birthDate}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={userInfo.profilePicture}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={userInfo.country}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={userInfo.city}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={userInfo.postalCode}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
            theme={theme}
          />
          <Button type="submit">Save Profile</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Profile saved successfully!</SuccessMessage>}
        </Form>
      ) : (
        <ProfileInfo>
          <h3>Profile Information</h3>
          {userInfo.profilePicture && <img src={userInfo.profilePicture} alt="Profile" width="150" />}
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Birth Date:</strong> {userInfo.birthDate}</p>
          <p><strong>Country:</strong> {userInfo.country}</p>
          <p><strong>City:</strong> {userInfo.city}</p>
          <p><strong>Postal Code:</strong> {userInfo.postalCode}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </ProfileInfo>
      )}
    </ProfileContainer>
  );
};

export default Profile;
