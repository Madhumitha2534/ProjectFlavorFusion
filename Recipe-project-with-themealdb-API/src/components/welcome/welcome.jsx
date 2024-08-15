import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import logo1 from '../../assets/logo1.png';
import backgroundGif from '../../assets/gif.gif'; // Import the background GIF
import leftGif from '../../assets/wel.gif'; // Import the left grid GIF

const Welcome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState('home'); // Default to home view
    const [slideText, setSlideText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const texts = ['Welcome to Flavor Fusion!', 'Discover Amazing Recipes!', 'Join Our Community!'];
        let index = 0;
        const interval = setInterval(() => {
            setSlideText(texts[index]);
            index = (index + 1) % texts.length;
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/home'); // Navigate to Home page
    };

    const handleRegister = () => {
        setView('register');
    };

    const handleStartNow = () => {
        if (isLoggedIn) {
            navigate('/home'); // Navigate to Home page
        } else {
            navigate('/login'); // Navigate to Login page
        }
    };

    const handleLogoClick = () => {
        navigate('/home'); // Navigate to Home page when logo is clicked
    };

    return (
        <div className="welcome-container">
            <nav className="navbar">
                <button className="logo-button" onClick={handleLogoClick}>
                    <img src={logo1} alt="Logo" className="logo" />
                </button>
                <div className="flavorFusion">Flavor Fusion</div>
            </nav>
            {view === 'login' && <Login onLogin={handleLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} />}
            {view === 'home' && (
                <div className="main-content">
                    <div className="image-container">
                        <img src={leftGif} alt="Placeholder GIF" className="picture" /> {/* Update to use GIF */}
                    </div>
                    <div className="text-content">
                        <div className="slider-text">{slideText}</div>
                        <button onClick={handleStartNow} className="start-now-button">
                            Start Now
                        </button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

                .welcome-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background-color: #FAAB36; /* Updated theme color */
                }
                .navbar {
                    display: flex;
                    align-items: center;
                    background-color: #FAAB36; /* Theme color */
                    color: white;
                    padding: 10px 20px;
                    box-sizing: border-box;
                    height: 60px; /* Adjust based on the actual height of your Navbar */
                }
                .logo-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    margin-right: 15px; /* Space between logo and text */
                }
                .logo {
                    width: 60px; /* Size of the logo */
                    height: 60px; /* Size of the logo */
                    border-radius: 50%;
                }
                .flavorFusion {
                    font-family: 'Dancing Script', cursive;
                    font-size: 37px; /* Size of the text */
                    color: #5b1408; /* Text color */
                }
                .main-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    padding: 20px;
                    position: relative;
                    overflow: hidden;
                    background-image: url(${backgroundGif}); /* Add background GIF */
                    background-size: cover; /* Ensure the background covers the entire container */
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-position: center; /* Center the background */
                    width: 100%;
                    height: 100%;
                }
                .text-content {
                    flex: 1;
                    text-align: center;
                    margin-left: 50px;
                    margin-right:100px; /* Move the text content to the left */
                }
                .slider-text {
                    font-size: 32px; /* Increase the font size here */
                    font-weight: bold;
                    animation: slide 3s infinite;
                    margin-left:-450px;
                }
                .start-now-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    background-color: #FAAB36; /* Updated theme color */
                    color: white;
                    cursor: pointer;
                    margin-top: 20px;
                    margin-left:-450px;
                }
                .image-container {
                    flex: 0 0 400px; /* Fixed width for the image container */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .picture {
                    width: 100%;
                    max-width: 400px;
                    height: auto;
                    border-radius: 8px;
                }
                @keyframes slide {
                    0% { opacity: 0; transform: translateY(-20px); }
                    50% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(20px); }
                }
                @media (max-width: 768px) {
                    .main-content {
                        flex-direction: column;
                    }
                    .image-container {
                        flex: none;
                        margin-bottom: 20px;
                    }
                    .text-content {
                        text-align: center;
                        margin-left: 0; /* Reset the left margin on smaller screens */
                    }
                }
            `}</style>
        </div>
    );
};

export default Welcome;
