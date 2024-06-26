import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { fetchMembers, sendFriendRequest } from '../api';
import { FaUserPlus } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const MembersContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

const MemberCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }

  .member-info {
    flex: 1;
    font-weight: bold;
  }

  .friend-request-icon {
    cursor: pointer;
    color: #000;
    &:hover {
      color: #32cd32; /* Lime Green */
    }
  }
`;

const Members = () => {
  const [members, setMembers] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchMembers().then((response) => setMembers(response.data._embedded.members));
  }, []);

  const handleSendFriendRequest = async (memberId) => {
    try {
      await sendFriendRequest(memberId);
      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <MembersContainer>
      {members.map((member) => (
        <MemberCard key={member._links.self.href} theme={theme}>
          <img src={member.profilePicture} alt={`${member.firstName} ${member.lastName}`} />
          <div className="member-info">
            {member.firstName} {member.lastName}
            <div>{member.city}, {member.country}</div>
          </div>
          <FaUserPlus
            className="friend-request-icon"
            onClick={() => handleSendFriendRequest(member._links.self.href.split('/').pop())}
          />
        </MemberCard>
      ))}
    </MembersContainer>
  );
};

export default Members;
