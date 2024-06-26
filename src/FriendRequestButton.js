// FriendRequestButton.js
import React from 'react';
import { sendFriendRequest } from './firebaseConfig'; // Adjust the import path as needed

const FriendRequestButton = ({ invitingMemberId, acceptingMemberId }) => {
  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(invitingMemberId, acceptingMemberId);
      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <button onClick={handleSendRequest}>Send Friend Request</button>
  );
};

export default FriendRequestButton;
