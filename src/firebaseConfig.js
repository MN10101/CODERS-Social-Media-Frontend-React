import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import api from './api';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUserWithEmailAndPassword = async (userDetails) => {
  const { email, password, username, firstName, lastName, birthDate, profilePicture, country, city, postalCode, phone } = userDetails;
  try {
    console.log('Starting user registration...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User created in Firebase:', user);

    // Update the user's profile
    await updateProfile(user, { displayName: username, photoURL: profilePicture });
    console.log('User profile updated with username and profile picture:', username, profilePicture);

    // Save user data in your backend
    const response = await api.post('/users', {
      username,
      email: user.email,
      enabled: true,
      member: {
        firstName,
        lastName,
        birthDate,
        profilePicture,
        country,
        city,
        postalCode,
        phone
      }
    });

    console.log('User data saved in backend:', response.data);

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export { auth, registerUserWithEmailAndPassword };
