import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { fetchFriends, fetchMemberDetails } from '../api';
import { ThemeContext } from '../contexts/ThemeContext';

const FriendsContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

const FriendCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FriendInfo = styled.div`
  text-align: center;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  .detail {
    margin: 0.5rem 0;
  }
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [friendDetails, setFriendDetails] = useState({});
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchFriends().then((response) => {
      const friendsData = response.data._embedded.friendshipInvitations.filter((invitation) => invitation.accepted);
      setFriends(friendsData);

      friendsData.forEach((friend) => {
        fetchMemberDetails(friend._links.acceptingMember.href).then((res) => {
          setFriendDetails((prevDetails) => ({
            ...prevDetails,
            [friend._links.acceptingMember.href]: res,
          }));
        }).catch((error) => {
          console.error('Error fetching member details:', error);
        });
      });
    }).catch((error) => {
      console.error('Error fetching friends:', error);
    });
  }, []);

  return (
    <FriendsContainer theme={theme}>
      <h2>Friends:</h2>
      {friends.map((friend) => {
        const friendDetail = friendDetails[friend._links.acceptingMember.href];
        return (
          friendDetail && (
            <FriendCard theme={theme} key={friend._links.self.href}>
              <FriendInfo>
                <img src={friendDetail.profilePicture} alt={`${friendDetail.firstName} ${friendDetail.lastName}`} />
                <div className="detail"><strong>Name:</strong> {friendDetail.firstName} {friendDetail.lastName}</div>
                <div className="detail"><strong>Username:</strong> {friendDetail.user.username}</div>
                <div className="detail"><strong>Email:</strong> {friendDetail.user.email}</div>
                <div className="detail"><strong>City:</strong> {friendDetail.city}</div>
                <div className="detail"><strong>Country:</strong> {friendDetail.country}</div>
                <div className="detail"><strong>Birth Date:</strong> {friendDetail.formattedBirthDate}</div>
                <div className="detail"><strong>Phone:</strong> {friendDetail.phone}</div>
                <div className="detail"><strong>Postal Code:</strong> {friendDetail.postalCode}</div>
              </FriendInfo>
            </FriendCard>
          )
        );
      })}
    </FriendsContainer>
  );
};

export default Friends;
