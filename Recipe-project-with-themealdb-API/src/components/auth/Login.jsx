import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo1.png';
import backgroundGif from '../../assets/gif.gif';
import loginGif from '../../assets/loginleft.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&s';

const FormInput = ({ type, value, onChange, label, isPasswordVisible, togglePasswordVisibility }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <div className="input-wrapper">
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                required 
                className="form-input" 
            />
            {label === 'Password' && (
                <span className="password-icon" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            )}
        </div>
    </div>
);

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "admin@gmail.com" && password === "admin12") {
            navigate('/adminpage');
        } else {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('userEmail', user.email);
                    localStorage.setItem('userAvatar', user.avatar || defaultAvatar);
                    if (typeof onLogin === 'function') {
                        onLogin();
                    }
                    navigate('/home');
                } else {
                    setError('Invalid email or password');
                }
            } catch (err) {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo1} alt="Logo" className="logo" />
                    <div className="flavorFusion">Flavor Fusion</div>
                </div>
            </nav>
            <div className="login-container">
                <div className="inner-container">
                    <div className="login-left">
                        <img src={loginGif} alt="Login Animation" className="login-image" />
                    </div>
                    <div className="login-right">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit} className="login-form">
                            <FormInput 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                label="Email" 
                            />
                            <FormInput 
                                type={isPasswordVisible ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                label="Password"
                                isPasswordVisible={isPasswordVisible}
                                togglePasswordVisibility={togglePasswordVisibility}
                            />
                            {error && <p className="error-message">{error}</p>} 
                            <button type="submit" className="submit-button">Login</button>
                        </form>
                        <p className="sign-up-link">
                            Don't have an account? 
                            <span onClick={handleRegisterClick}> Sign Up</span>
                        </p>
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
                    .login-container {
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
                    .login-left {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        box-sizing: border-box;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                    }
                    .login-right {
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
                    .login-image {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                    }
                    .login-form {
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
                    .input-wrapper {
                        position: relative;
                        width: 100%;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                    }
                    .password-icon {
                        position: absolute;
                        right: 10px;
                        top: 50%;
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
                    .sign-up-link {
                        color: #007BFF;
                        cursor: pointer;
                        margin-top: 10px;
                    }
                    .sign-up-link span {
                        text-decoration: underline;
                    }
                    .sign-up-link span:hover {
                        color: #0056b3;
                    }
                    .error-message {
                        color: red;
                        margin-top: 10px;
                    }
                    @media (max-width: 768px) {
                        .inner-container {
                            flex-direction: column;
                        }
                        .login-left, .login-right {
                            flex: none;
                            width: 100%;
                            border-radius: 0;
                            margin-bottom: 20px;
                        }
                        .login-left {
                            order: 2;
                        }
                        .login-right {
                            order: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Login;
