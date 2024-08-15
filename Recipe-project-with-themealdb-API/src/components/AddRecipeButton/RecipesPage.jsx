import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

const RecipeListPage = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail'); 

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user-recipes?email=${userEmail}`);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [userEmail]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/recipes/delete/${id}`);
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '60px', background: '#FFF5E1', minHeight: '100vh' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', borderRadius: '10px', textAlign: 'left', animation: 'slide-in 0.5s ease-out' }}>
                    <h2>Recipe List</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {recipes.length > 0 ? recipes.map((recipe) => (
                            <div 
                                key={recipe.id} 
                                className="recipe-card"
                            >
                                <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.recipeName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '15px' }}>
                                    <h4>{recipe.recipeName}</h4>
                                    <p>{recipe.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                                        <button 
                                            onClick={() => handleDelete(recipe.id)} 
                                            style={{ 
                                                padding: '8px 16px', 
                                                backgroundColor: '#dc3545', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No recipes available.</p>}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .recipe-card {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    overflow: hidden;
                    width: 300px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                    transition: transform 0.3s, box-shadow 0.3s;
                    margin-bottom: 20px;
                }

                .recipe-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default RecipeListPage;
