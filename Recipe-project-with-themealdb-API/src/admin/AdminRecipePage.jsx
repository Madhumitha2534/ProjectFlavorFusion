import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaClipboard } from 'react-icons/fa';  // Import clipboard icon

const AdminRecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeJSON, setSelectedRecipeJSON] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    // Fetch recipes from backend when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipe-list');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    // Toggle JSON display for the selected recipe
    const handleShowJSON = (recipe) => {
        if (selectedRecipeJSON && selectedRecipeJSON.recipeName === recipe.recipeName) {
            setSelectedRecipeJSON(null); // Hide JSON if already selected
        } else {
            const filteredRecipe = {
                recipeName: recipe.recipeName || '',
                ingredients: recipe.ingredients || '',
                quantity: recipe.quantity || '',
                description: recipe.description || '',
                image: "Recipe Image",  // Simplified image name
                userEmail: recipe.userEmail || ''
            };
            setSelectedRecipeJSON(filteredRecipe);
            setCopySuccess(''); // Reset copy success message
        }
    };

    // Copy selected recipe JSON to clipboard
    const handleCopyToClipboard = () => {
        if (selectedRecipeJSON) {
            const recipeJSON = JSON.stringify(selectedRecipeJSON, null, 2);
            navigator.clipboard.writeText(recipeJSON)
                .then(() => setCopySuccess('Successfully copied to clipboard!'))
                .catch(() => setCopySuccess('Failed to copy to clipboard.'));
        }
    };

    // Download all recipes as a JSON file
    const handleDownloadJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recipes, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "recipes.json");
        document.body.appendChild(downloadAnchorNode); // Required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    

    return (
        <div style={{ paddingTop: '60px', background: '#FFF5E1', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
                <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Admin Recipe Page</h1>
               

                <button
                    style={{ marginBottom: '20px', backgroundColor: '#FF8C00', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                    onClick={handleDownloadJSON}
                >
                    Download Recipes as JSON
                </button>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#FF8C00', color: '#fff' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Recipe Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ingredients</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Image</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Added By</th> {/* userEmail Column */}
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.length > 0 ? recipes.map((recipe, index) => (
                            <tr key={index} style={{ textAlign: 'center', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{recipe.recipeName}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{recipe.ingredients}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{recipe.quantity}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{recipe.description}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {recipe.image ? (
                                        <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.recipeName} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                                    ) : 'No Image'}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{recipe.userEmail || 'N/A'}</td> {/* userEmail Column */}
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button 
                                        onClick={() => handleShowJSON(recipe)}
                                        style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: '#28a745', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '5px', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        {selectedRecipeJSON && selectedRecipeJSON.recipeName === recipe.recipeName ? 'Hide JSON' : 'Show JSON'}
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No recipes available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {selectedRecipeJSON && (
                    <div style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Selected Recipe JSON</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '16px' }}>
                            {JSON.stringify(selectedRecipeJSON, null, 2)}
                        </pre>
                        <FaClipboard
                            onClick={handleCopyToClipboard}
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                fontSize: '24px',
                                color: '#007bff',
                                cursor: 'pointer'
                            }}
                        />
                        {copySuccess && (
                            <p style={{ position: 'absolute', bottom: '40px', right: '10px', color: 'green', fontSize: '14px' }}>{copySuccess}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRecipePage;
