import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../../assets/logo1.png';
import backgroundGif from '../../assets/gif.gif';
import registerGif from '../../assets/logingif.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// FormInput component for reusable form fields
const FormInput = ({ type, value, onChange, label, children }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <div className="form-input-container">
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                required 
                className="form-input" 
            />
            {children}
        </div>
    </div>
);

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', {
                name,
                email,
                password
            });
            console.log('User registered:', response.data);
            
            setMessage('Registration successful! Redirecting to login...');
            
            if (typeof onRegister === 'function') {
                onRegister();
            }

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            if (error.response) {
                // Handle specific error responses
                if (error.response.status === 409) {
                    setMessage('Email already exists.');
                } else if (error.response.status === 400) {
                    setMessage('Registration failed due to bad input.');
                } else {
                    setMessage('Registration failed. Please try again.');
                }
            } else {
                setMessage('Registration failed. Please check your network connection.');
            }
        }
    };

    // Navigate to login page
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo1} alt="Logo" className="logo" />
                    <div className="flavorFusion">Flavor Fusion</div>
                </div>
            </nav>
            <div className="register-container">
                <div className="inner-container">
                    <div className="register-left">
                        <img src={registerGif} alt="Register Animation" className="register-image" />
                    </div>
                    <div className="register-right">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit} className="register-form">
                            <FormInput 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                label="Name" 
                            />
                            <FormInput 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                label="Email" 
                            />
                            <FormInput 
                                type={showPassword ? 'text' : 'password'} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                label="Password"
                            >
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </FormInput>
                            <button type="submit" className="submit-button">Register</button>
                            {message && <p className="message">{message}</p>}
                            <p className="login-link">
                                Have an account? 
                                <span onClick={handleLoginClick}> Login</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .app {
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        background: url(${backgroundGif}) no-repeat center center fixed;
                        background-size: cover;
                    }
                    .navbar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: rgba(250, 171, 54, 0.8);
                        color: white;
                        padding: 10px 20px;
                    }
                    .navbar-left {
                        display: flex;
                        align-items: center;
                    }
                    .logo {
                        height: 60px;
                        width: 60px;  
                        border-radius: 50%;  
                        margin-right: 10px;
                        object-fit: cover;  
                    }
                    .flavorFusion {
                        font-family: 'Dancing Script', cursive;
                        font-size: 37px;
                        color: #5b1408;
                    }
                    .register-container {
                        display: flex;
                        flex-direction: row;
                        height: 100%;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        background: rgba(255, 255, 255, 0.8);
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px;
                    }
                    .inner-container {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        width: 60%;
                        max-width: 1200px;
                        background-color: white;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        border-radius: 8px;
                    }
                    .register-left {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        box-sizing: border-box;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                    }
                    .register-right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 40px;
                        box-sizing: border-box;
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .register-image {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                    }
                    .register-form {
                        width: 100%;
                    }
                    .form-group {
                        margin-bottom: 15px;
                        width: 100%;
                    }
                    .form-label {
                        margin-bottom: 5px;
                        font-weight: bold;
                        display: block;
                    }
                    .form-input-container {
                        position: relative;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                    }
                    .password-toggle-icon {
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                    .submit-button {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        background-color: #FAAB36;
                        color: white;
                        cursor: pointer;
                        margin-top: 10px;
                        transition: background-color 0.3s ease;
                    }
                    .submit-button:hover {
                        background-color: #f5c16c;
                    }
                    .submit-button:active {
                        background-color: #f5c16c;
                        box-shadow: 0 5px #666;
                        transform: translateY(4px);
                    }
                    .message {
                        color: red;
                        margin-top: 10px;
                    }
                    .login-link {
                        color: #007BFF;
                        cursor: pointer;
                        margin-top: 10px;
                    }
                    .login-link span {
                        text-decoration: underline;
                    }
                    .login-link span:hover {
                        color: #0056b3;
                    }
                    @media (max-width: 768px) {
                        .inner-container {
                            flex-direction: column;
                        }
                        .register-left, .register-right {
                            flex: none;
                            width: 100%;
                            border-radius: 0;
                            margin-bottom: 20px;
                        }
                        .register-left {
                            order: 2;
                        }
                        .register-right {
                            order: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Register;
