import React from 'react';

import Categories from '../categories/Categories';
import FavouriteFoods from '../favouriteFoods/FavouriteFoods';
import Hero from '../hero/Hero';
import Navbar from '../navbar/Navbar';
import AddRecipeButton from '../AddRecipeButton/AddRecipeButton';
import RecipeContestPage from '../auth/RecipeContestPage';
import CircleCards from '../AddRecipeButton/CircleCards';
import AdminRecipePage from '../../admin/AdminRecipePage';


 // Ensure the correct path to Footer

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={{ position: 'relative', paddingTop: '60px' }}> {/* Adjust paddingTop based on Navbar height */}
                <AddRecipeButton />
                 <Hero />
                <FavouriteFoods />
                <Categories />
                <CircleCards/>
                <RecipeContestPage/>
              
              
            </div>
            
        </div>
    );
};

export default Home;
