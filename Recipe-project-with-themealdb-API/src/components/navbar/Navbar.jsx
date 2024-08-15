import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import classes from './navbar.module.css';
import logo1 from '../../assets/logo1.png';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [avatar, setAvatar] = useState('https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch avatar URL from local storage or another source
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('userAvatar'); // Optional: clear avatar on logout
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <Link to='/' className={classes.left}>
                        <img src={logo1} alt="logo" className={classes.logo} />
                        <span className={classes.flavorFusion}>Flavor Fusion</span>
                    </Link>
                    <ul className={classes.center}>
                        <li className={classes.listItem}>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li className={classes.listItem}>
                            <Link to='/about'>About</Link>
                        </li>
                        <li className={classes.listItem}>
                            <Link to='/contact'>Contacts</Link>
                        </li>
                        <li className={classes.listItem}>
                            <Link to='/services'>Services</Link>
                        </li>
                    </ul>
                    <div className={classes.right}>
                        <input
                            type="text"
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={classes.searchInput}
                        />
                        <AiOutlineSearch className={classes.searchIcon} />
                        <div className={classes.dropdown}>
                            <img src={avatar} alt="User Avatar" className={classes.avatar} onClick={toggleDropdown} />
                            {isDropdownOpen && (
                                <div className={classes.dropdownContent}>
                                    <Link to="/profile">Personal Info</Link>
                                    <Link to="/recipe-list">Recipes Added</Link>
                                </div>
                            )}
                        </div>
                        <button onClick={handleLogout} className={classes.logoutButton}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
