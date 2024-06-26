import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { fetchMembers, fetchMemberDetails } from '../api';
import { ThemeContext } from '../contexts/ThemeContext';
import MemberInfoModal from './MemberInfoModal';

const SidebarContainer = styled.div`
  position: fixed;
  top: 4rem;
  right: 0;
  width: 250px;
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  padding: 1rem;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => (theme === 'light' ? '#00796b' : '#80cbc4')};
  margin-bottom: 1rem;
`;

const MemberLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-decoration: none;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #333;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    margin-right: 1rem;
  }
`;

const RightSidebar = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchMembers().then((response) => {
      if (response.data && response.data._embedded && response.data._embedded.members) {
        setMembers(response.data._embedded.members);
      }
    });
  }, []);

  const handleMemberClick = async (memberUrl) => {
    const memberDetails = await fetchMemberDetails(memberUrl);
    setSelectedMember(memberDetails);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <SidebarContainer theme={theme}>
      <Title theme={theme}>All Members</Title>
      {members.map(member => (
        <MemberLink
          theme={theme}
          key={member._links.self.href}
          onClick={() => handleMemberClick(member._links.self.href)}
        >
          <img src={member.profilePicture} alt={`${member.firstName} ${member.lastName}`} />
          {member.firstName} {member.lastName}
        </MemberLink>
      ))}
      {selectedMember && (
        <MemberInfoModal member={selectedMember} onClose={closeModal} theme={theme} />
      )}
    </SidebarContainer>
  );
};

export default RightSidebar;
