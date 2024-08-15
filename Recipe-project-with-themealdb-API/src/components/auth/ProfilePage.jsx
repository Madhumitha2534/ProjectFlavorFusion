import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const ProfilePage = () => {
  const defaultAvatarUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'; // Default avatar URL

  const [profile, setProfile] = useState({
    avatar: defaultAvatarUrl,
    name: '',
    email: '',
    recipeCount: 0
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchProfile = () => {
      if (email) {
        axios.get(`http://localhost:8080/profile?email=${email}`)
          .then(response => {
            setProfile({
              name: response.data.name || '',
              email: response.data.email || '',
              recipeCount: response.data.recipeCount || 0,
              avatar: response.data.avatar || defaultAvatarUrl
            });
          })
          .catch(error => {
            setError("Failed to fetch user details");
            console.error("Error fetching user details:", error.response ? error.response.data : error.message);
          });
      } else {
        setError("No email found in local storage. Please login.");
      }
    };

    fetchProfile();
  }, [email]);

  const handleBack = () => {
    navigate('/home');
  };

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h2 className="profile-title">Profile Page</h2>
          <div className="profile-content">
            <div className="profile-avatar">
              {profile.avatar === defaultAvatarUrl ? (
                <div className="avatar-initials">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </div>
              ) : (
                <img src={profile.avatar} alt="Avatar" className="avatar-image" />
              )}
            </div>
            <div className="profile-details">
              <h3>Name: {profile.name}</h3>
              <h3>Email: {profile.email}</h3>
              <h3>Recipes Added: {profile.recipeCount}</h3>
            </div>
          </div>
          <button 
            onClick={handleBack} 
            className="back-button"
          >
            Back
          </button>
        </div>

        <style>
          {`
            .profile-page {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              background-color: #f5f5f5;
              min-height: 100vh;
              font-family: 'Montserrat', sans-serif;
            }
            .profile-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
              width: 100%;
              max-width: 600px;
              animation: slide-in 0.5s ease-out;
              transition: all 0.3s ease;
            }
            .profile-container:hover {
              box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
            }
            .profile-title {
              font-size: 2.2em;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }
            .profile-content {
              text-align: center;
            }
            .profile-avatar {
              margin-bottom: 20px;
              position: relative;
            }
            .avatar-image {
              width: 150px;
              height: 150px;
              object-fit: cover;
              border-radius: 50%;
              border: 2px solid #ddd;
              transition: transform 0.3s ease;
            }
            .avatar-image:hover {
              transform: scale(1.05);
            }
            .avatar-initials {
              width: 150px;
              height: 150px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 4em;
              color: #fff;
              background-color: #90ee90; /* Light green color */
              border-radius: 50%;
              border: 2px solid #ddd;
              transition: transform 0.3s ease;
            }
            .avatar-initials:hover {
              transform: scale(1.05);
            }
            .profile-details {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
              margin: 10px 0;
            }
            .profile-details h3 {
              margin: 10px 0;
              color: #555;
              font-size: 1.2em;
            }
            .back-button {
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #ffa500; /* Orange color */
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .back-button:hover {
              background-color: #e69500;
            }
            @keyframes slide-in {
              from {
                transform: translateY(-100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @media (max-width: 768px) {
              .profile-container {
                padding: 15px;
              }
              .profile-title {
                font-size: 1.8em;
              }
              .avatar-image,
              .avatar-initials {
                width: 120px;
                height: 120px;
                font-size: 3em;
              }
              .profile-details h3 {
                font-size: 1em;
              }
              .back-button {
                padding: 8px 15px;
                font-size: 0.9em;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ProfilePage;
