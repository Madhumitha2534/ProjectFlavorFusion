import React from 'react';
import { Link } from 'react-router-dom';

const AddRecipeButton = () => {
    const buttonContainerStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    };

    const buttonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#ff6347', // Adjust color as needed
        color: 'white',
        fontSize: '24px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const buttonTextStyle = {
        color: '#5b1408', // Brown color for the text
        display: 'none', // Hide text on small screens
        marginLeft: '10px',
    };

    const buttonTextStyleLargeScreen = {
        ...buttonTextStyle,
        display: 'inline',
    };

    return (
        <div style={buttonContainerStyle}>
            <Link to="/add-recipe" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <button style={buttonStyle}>+</button>
                <span style={window.innerWidth >= 600 ? buttonTextStyleLargeScreen : buttonTextStyle}>
                    Add Recipe
                </span>
            </Link>
        </div>
    );
};

export default AddRecipeButton;
