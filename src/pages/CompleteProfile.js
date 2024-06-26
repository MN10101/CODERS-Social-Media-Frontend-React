import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { registerUser, fetchUserProfile, updateUserProfile } from '../api';
import styled from 'styled-components';

const CompleteProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const CompleteProfile = () => {
  const [profileInfo, setProfileInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    profilePicture: '',
    country: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const response = await fetchUserProfile(user.uid);
          if (response.data) {
            setProfileInfo(response.data);
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const userData = {
          ...profileInfo,
          email: user.email,
          enabled: true,
        };
        if (profileInfo.id) {
          await updateUserProfile(userData);
        } else {
          await registerUser(userData);
        }
        navigate('/profile');
      }
    } catch (err) {
      setError('Failed to complete profile. Please try again.');
    }
  };

  return (
    <CompleteProfileContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={profileInfo.username}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={profileInfo.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={profileInfo.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={profileInfo.birthDate}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={profileInfo.profilePicture}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="country"
          placeholder="Country"
          value={profileInfo.country}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={profileInfo.city}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={profileInfo.postalCode}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={profileInfo.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit">Complete Profile</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </CompleteProfileContainer>
  );
};

export default CompleteProfile;
