/* eslint-disable */
import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar.js';
import './cssFile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image'

function User() {
  const { uid } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    fetchUserListings();
    fetchUserDetails();
    checkIfFollowing();
  }, [uid]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`https://backend-server-qdnc.onrender.com/User/${uid}`);
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://backend-server-qdnc.onrender.com/user_details/${uid}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkIfFollowing = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/following');
      const followingList = response.data;
      const isFollowingUser = followingList.some((user) => user.id === uid);
      setIsFollowing(isFollowingUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const followUser = async () => {
    try {
      await axios.post('https://backend-server-qdnc.onrender.com/follow', {
        uid,
        currentUserUid: userDetails.uid,
      });
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await axios.post('https://backend-server-qdnc.onrender.com/unfollow', {
        unfollowedUser: {
          id: uid,
        },
      });
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };


  const toggleFollow = () => {
    if (isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  return (
    <div>
      <h1 className="listings">{userListings.length > 0 ? `${userListings[0].name}'s Listings` : ''}</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <main className="main">
        <button type="button" onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? 'Row View' : 'Grid View'}
        </button>
      </main>
      <div className="listings">
        <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
          {userListings.map((listing) => (
            <li key={listing.id}>
              <div className="left">
                <p>
                  Title:
                  {listing.title}
                </p>
                <p>
                  Price:
                  {listing.price}
                </p>
                <p>
                  Category:
                  {listing.category}
                </p>
                <p>
                  Description:
                  {listing.description}
                </p>
              </div>
              <div className="slide-container">
                {listing.pictures.length > 0 && (
                  <Slide>
                    {listing.pictures.map((picture, index) => (
                      <img key={index} src={picture} alt={`Picture ${index + 1}`} />
                    ))}
                  </Slide>
                )}
              </div>
            </li>
          ))}
        </ul>
        <main className="main">
          <button type="button" onClick={toggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </main>
      </div>
    </div>
  );
}

export default User;

