import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { createPost } from '../api';
import { ThemeContext } from '../contexts/ThemeContext';

// Styled components
const CreatePostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const CreatePostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#444')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  &:focus {
    border-color: #000;
  }
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  background-color: #000;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
`;

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPost(content, mediaUrl);
      onPostCreated(newPost.data);
      setContent('');
      setMediaUrl('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <CreatePostContainer theme={theme}>
      <CreatePostForm onSubmit={handleSubmit}>
        <TextArea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
          theme={theme}
        />
        <TextArea
          placeholder="Enter media URL (optional)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          rows="1"
          theme={theme}
        />
        <IconWrapper>
          <Button type="submit">Post</Button>
        </IconWrapper>
      </CreatePostForm>
    </CreatePostContainer>
  );
};

export default CreatePost;
