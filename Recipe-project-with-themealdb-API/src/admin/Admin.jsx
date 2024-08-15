import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo1 from '../assets/logo1.png'; // Adjust the path to your logo image

const Admin = () => {
    return (
        <div className="adminContainer">
            <div className="sidePanel">
                <img src={logo1} alt="Logo" className="sideLogo" />
                <Link to="/admin/users" className="button-30 sideNavLink">Users</Link>
                <Link to="/admin/recipes" className="button-30 sideNavLink">Recipes</Link>
                <Link to="/admin/contest" className="button-30 sideNavLink">Contest</Link>
            </div>
            <div className="mainContent">
                <nav className="navbar">
                    <div className="navbarLeft">
                        <div className="flavorFusion">Flavor Fusion</div>
                    </div>
                    <div className="navbarRight">
                        <Link to="/" className="logoutButton">Logout</Link>
                    </div>
                </nav>
                <div className="contentWrapper">
                    {/* The Outlet component renders the matching child route */}
                    <Outlet />
                </div>
            </div>

            <style jsx>{`
                .adminContainer {
                    display: flex;
                    height: 100vh;
                    background-color: #f7f7f7;
                }
                .sidePanel {
                    width: 250px;
                    background-color: #222;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 0 10px rgba(255, 165, 0, 0.7);
                }
                .sideLogo {
                    height: 100px;
                    margin-bottom: 30px;
                }
                .button-30 {
                    align-items: center;
                    appearance: none;
                    background-color: #FFA500;
                    border-radius: 4px;
                    border-width: 0;
                    box-shadow: rgba(255, 165, 0, 0.4) 0 2px 4px, rgba(255, 165, 0, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
                    box-sizing: border-box;
                    color: #222;
                    cursor: pointer;
                    display: inline-flex;
                    font-family: "JetBrains Mono", monospace;
                    height: 40px;
                    justify-content: center;
                    line-height: 1;
                    overflow: hidden;
                    padding-left: 16px;
                    padding-right: 16px;
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    transition: box-shadow .15s, transform .15s;
                    user-select: none;
                    white-space: nowrap;
                    font-size: 14px;
                    margin: 10px 0;
                    width: 100%;
                }
                .button-30:focus {
                    box-shadow: rgba(255, 165, 0, 0.5) 0 0 0 1.5px inset, rgba(255, 165, 0, 0.4) 0 2px 4px, rgba(255, 165, 0, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
                }
                .button-30:hover {
                    box-shadow: rgba(255, 165, 0, 0.6) 0 4px 8px, rgba(255, 165, 0, 0.4) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
                    transform: translateY(-2px);
                }
                .button-30:active {
                    box-shadow: #FFA500 0 3px 7px inset;
                    transform: translateY(2px);
                }
                .mainContent {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    background-color: #FFA500;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .navbarLeft {
                    display: flex;
                    align-items: center;
                }
                .flavorFusion {
                    font-family: 'Dancing Script', cursive;
                    font-size: 30px;
                    color: #5b1408;
                }
                .navbarRight {
                    display: flex;
                    align-items: center;
                }
                .logoutButton {
                    text-decoration: none;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    background-color: #d9534f;
                    padding: 8px 15px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s;
                }
                .logoutButton:hover {
                    background-color: #c9302c;
                }
                .contentWrapper {
                    flex-grow: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background-color: #FFF5E1;
                }
            `}</style>
        </div>
    );
};

export default Admin;
