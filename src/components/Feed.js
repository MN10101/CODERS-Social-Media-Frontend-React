import React, { useState, useEffect, useContext } from 'react';
import { fetchPosts } from '../api';
import CreatePost from './CreatePost';
import Post from './Post';
import { ThemeContext } from '../contexts/ThemeContext';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data._embedded.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;