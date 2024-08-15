import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

const AddRecipePage = () => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [userEmail, setUserEmail] = useState(''); // State for user email

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('recipeName', recipeName);
        formData.append('ingredients', ingredients);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('userEmail', userEmail); // Include user email in form data
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:8080/add-recipe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                // Save the user email to localStorage
                localStorage.setItem('userEmail', userEmail);

                setSuccessMessage('Recipe added successfully!');
                setRecipeName('');
                setIngredients('');
                setQuantity('');
                setDescription('');
                setImage(null);
                setImagePreview(null);
                setUserEmail(''); // Clear email field after submission
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding recipe:', error.response?.data || error.message);
            setSuccessMessage('Failed to add recipe. Please try again.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '60px', background: '#FFF5E1', minHeight: '100vh' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add New Recipe</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="userEmail" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Registered Email ID</label>
                            <input
                                type="email"
                                id="userEmail"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="recipeName" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Recipe Name</label>
                            <input
                                type="text"
                                id="recipeName"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                required
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="ingredients" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Ingredients</label>
                            <textarea
                                id="ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="quantity" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Quantity</label>
                            <input
                                type="text"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="description" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '100px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="image" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            {imagePreview && (
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            style={{ padding: '12px 20px', backgroundColor: '#FF8C00', color: '#ffffff', fontSize: '18px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
                        >
                            Add Recipe
                        </button>
                        {successMessage && (
                            <p style={{ marginTop: '20px', color: '#28a745', textAlign: 'center', fontWeight: 'bold' }}>{successMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecipePage;
