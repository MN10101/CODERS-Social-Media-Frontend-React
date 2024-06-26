import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { fetchPosts } from '../api';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#222')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        if (response.data._embedded && response.data._embedded.posts) {
          setPosts(response.data._embedded.posts);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <HomeContainer theme={theme}>
      <CreatePost onPostCreated={handlePostCreated} />
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post._links.self.href} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </HomeContainer>
  );
};

export default Home;
