import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { fetchPostComments, fetchPostLikes, fetchPostMemberDetails, likePost, unlikePost, addComment, fetchCommentMemberDetails } from '../api';
import { FaHeart, FaComment } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  .post-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 1rem;
    }

    .member-info {
      font-weight: bold;
    }
  }

  .post-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .post-content {
    margin: 1rem 0;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  .post-icons {
    display: flex;
    align-items: center;

    .icon {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
      cursor: pointer;
    }

    .icon span {
      margin-left: 0.5rem;
    }
  }

  .comments-section {
    margin-top: 1rem;
  }

  .comment-form {
    display: flex;
    margin-top: 0.5rem;
    
    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 5px 0 0 5px;
      background: ${({ theme }) => (theme === 'light' ? 'white' : '#333')};
      color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #000;
      color: white;
      cursor: pointer;
      border-radius: 0 5px 5px 0;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    
    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin-right: 0.5rem;
    }

    .comment-content {
      background: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#444')};
      padding: 0.5rem;
      border-radius: 5px;
      flex: 1;
    }
  }
`;

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [member, setMember] = useState({});
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberDetails = await fetchPostMemberDetails(post._links.member.href);
        setMember(memberDetails.data);

        const likesResponse = await fetchPostLikes(post._links.likes.href);
        setLikes(likesResponse.data._embedded.likes);
        setIsLiked(likesResponse.data._embedded.likes.some((like) => like.member.id === memberDetails.data.id));

        const commentsResponse = await fetchPostComments(post._links.comments.href);
        const commentsWithDetails = await Promise.all(commentsResponse.data._embedded.comments.map(async (comment) => {
          const commentMemberDetails = await fetchCommentMemberDetails(comment._links.member.href);
          return { ...comment, member: commentMemberDetails.data };
        }));
        setComments(commentsWithDetails);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [post]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }

      const likesResponse = await fetchPostLikes(post._links.likes.href);
      setLikes(likesResponse.data._embedded.likes);
      setIsLiked(likesResponse.data._embedded.likes.some((like) => like.member.id === member.id));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await addComment(post.id, commentText);

      const commentsResponse = await fetchPostComments(post._links.comments.href);
      const commentsWithDetails = await Promise.all(commentsResponse.data._embedded.comments.map(async (comment) => {
        const commentMemberDetails = await fetchCommentMemberDetails(comment._links.member.href);
        return { ...comment, member: commentMemberDetails.data };
      }));
      setComments(commentsWithDetails);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <PostContainer theme={theme}>
      <div className="post-header">
        <img src={member.profilePicture} alt={`${member.firstName} ${member.lastName}`} />
        <div className="member-info">{member.firstName} {member.lastName}</div>
      </div>
      <img className="post-image" src={post.mediaUrl} alt="Post media" />
      <div className="post-content">{post.content}</div>
      <div className="post-footer">
        <div>{post.createdAtFormatted}</div>
        <div className="post-icons">
          <div className="icon" onClick={handleLike}>
            <FaHeart style={{ color: isLiked ? 'red' : 'inherit' }} />
            <span>{likes.length}</span>
          </div>
          <div className="icon">
            <FaComment />
            <span>{comments.length}</span>
          </div>
        </div>
      </div>
      <div className="comments-section">
        {comments.map(comment => (
          <div className="comment" key={comment._links.self.href}>
            <img src={comment.member.profilePicture} alt={`${comment.member.firstName} ${comment.member.lastName}`} />
            <div className="comment-content" theme={theme}>
              <strong>{comment.member.user.username}</strong>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
        <form className="comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            theme={theme}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </PostContainer>
  );
};

export default Post;
