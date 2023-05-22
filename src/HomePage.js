import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
// import the Navbar component
// eslint-disable-next-line max-len
// eslint-disable-next-line import/extensions,import/no-named-as-default,import/no-named-as-default-member
import AddProductPopup from './AddProductPopup.js';
import './HomePage.css';
// eslint-disable-next-line import/extensions
import UserNavbar from './UserNavbar.js';

function HomePage() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const fetchUserListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user_listings');
      setUserListings(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);
  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = async () => {
    setPopupIsOpen(false);
    // Perform any necessary operations to add the listing

    // Fetch updated user listings
    await fetchUserListings();

    // Refresh the page
    window.location.reload();
  };

  const handleLike = (listingId) => {
    // Handle like button click for the specific listing
    // Perform necessary actions, such as updating the like count
  };

  const handleShare = (listingId) => {
    // Handle share button click for the specific listing
    // Perform necessary actions, such as opening a share dialog
  };

  const handleContactDetails = (listingId) => {
    // Handle contact details button click for the specific listing
    // Perform necessary actions, such as displaying contact information
  };

  const handleBuy = (listingId) => {
    // Handle buy button click for the specific listing
    // Perform necessary actions, such as initiating a purchase flow
  };

  return (
      <div className="App">
          <header className="header">
              <UserNavbar />
          </header>
          <main className="main">
              {!popupIsOpen && (
              <button type="button" onClick={openPopup}>
                  Add Product
              </button>
              )}
              {popupIsOpen && <AddProductPopup closePopup={closePopup} />}
              {!popupIsOpen && (
              <>

              </>
              )}
          </main>
          <div className="listings">
              <div className="fonts">
                  <h3>Your Listings</h3>
                  <ul>
                      {userListings.map((listing) => (
                          <li key={listing.id}>
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

                              {/* Additional buttons */}
                              {/* eslint-disable-next-line react/button-has-type */}
                              <button onClick={() => handleLike(listing.id)}>Like</button>
                              {/* eslint-disable-next-line react/button-has-type */}
                              <button onClick={() => handleShare(listing.id)}>Share</button>
                              {/* eslint-disable-next-line max-len,react/button-has-type */}
                              <button onClick={() => handleContactDetails(listing.id)}>Contact Details</button>
                              {/* eslint-disable-next-line react/button-has-type */}
                              <button onClick={() => handleBuy(listing.id)}>Buy</button>
                          </li>
                      ))}
                  </ul>

              </div>

          </div>

      </div>
  );
}

export default HomePage;
