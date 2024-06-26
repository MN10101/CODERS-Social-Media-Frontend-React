import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPosts = (page = 0, size = 20) => api.get(`/posts?page=${page}&size=${size}`);
export const fetchProfile = () => api.get('/profile');
export const fetchMembers = (page = 0, size = 20) => api.get(`/members?page=${page}&size=${size}`);
export const fetchFriends = (page = 0, size = 20) => api.get(`/friendshipInvitations?page=${page}&size=${size}`);
export const fetchPostDetails = (postId) => api.get(`/posts/${postId}`);
export const fetchPostComments = (url) => {
  console.log('Fetching comments from URL:', url);
  return api.get(url);
};
export const fetchPostLikes = (url) => api.get(url);
export const fetchPostMemberDetails = (url) => api.get(url);

export const likePost = (postId) => api.post(`/posts/${postId}/likes`);
export const unlikePost = (postId) => api.delete(`/posts/${postId}/likes`);
export const addComment = (postId, comment) => api.post(`/posts/${postId}/comments`, { content: comment });

export const createPost = (content, mediaUrl = null) => {
  return api.post('/posts', { content, mediaUrl });
};

export const fetchCommentMemberDetails = (url) => api.get(url);

export const registerUser = (userData) => api.post('/users', userData);

export const fetchUserProfile = (userId) => api.get(`/users/${userId}`);

export const updateUserProfile = (userData) => api.post(`/users/${userData.id}`, userData);

export const sendFriendRequest = (memberId) => api.post(`/friendshipInvitations`, { memberId });

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/api', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const fetchMemberDetails = async (url) => {
  const memberResponse = await api.get(url);
  const userResponse = await api.get(memberResponse.data._links.user.href);
  return { ...memberResponse.data, user: userResponse.data };
};

export default api;