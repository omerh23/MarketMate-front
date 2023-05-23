/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

function FollowingList({ onClose }) {
  const [following, setFollowing] = useState([]);
  const [followingError, setFollowingError] = useState('');

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    try {
      const response = await axios.get('http://localhost:5000/following');
      setFollowing(response.data);
    } catch (error) {
      console.log(error);
      setFollowingError('Failed to fetch following list.');
    }
  };

  async function unfollowUser(unfollowedUser) {
    try {
      const response = await axios.post('http://localhost:5000/unfollow', { unfollowedUser }, {
        headers: { Authorization: authToken }, // Include the authentication token in the request headers
      });
      console.log(response.data); // "Unfollow successful"
      setFollowing((prevFollowing) => prevFollowing.filter((user) => user.id !== unfollowedUser.id));
    } catch (error) {
      console.log(error);
      setFollowingError('Failed to unfollow user.');
    }
  }





  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleUnfollow = (event, user) => {
    event.preventDefault();
    unfollowUser(user);
  };

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay" />
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Following</h1>
        <form onSubmit={handleSubmit}>
          <ul className="fonts">
            {following.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <span> ({user.username})</span> {/* Display the username */}
                <button
                  className="unfollow-button"
                  type="button"
                  onClick={(event) => handleUnfollow(event, user)}
                >
                  Unfollow
                </button>
              </li>
            ))}
          </ul>
          {followingError && <p className="error-message">{followingError}</p>}
          <br />
          <button type="submit">Close</button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default FollowingList;
