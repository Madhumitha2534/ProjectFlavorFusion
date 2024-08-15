import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Welcome from './components/welcome/welcome.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import AddRecipePage from './components/AddRecipeButton/AddRecipePage.jsx';
import ChatbotBubble from './components/ChatbotBubble.jsx';
import Footer from './components/auth/Footer.jsx';
import Contact from './components/Contacts/Contact.js';
import About from './components/About/About.js';
import Services from './components/services/Services.js';
import FAQ from './components/services/FAQ.js';
import Terms from './components/services/Terms.js';
import ProfilePage from './components/auth/ProfilePage.jsx';
import RecipeListPage from './components/AddRecipeButton/RecipesPage.jsx';
import RecipeContestApplication from './components/auth/RecipeSubissionForm.jsx';
import Admin from './admin/Admin.jsx';
import AdminRecipePage from './admin/AdminRecipePage.jsx';
import UsersPage from './admin/UsersPage.jsx';
import ContestUsers from './admin/ContestUsers.jsx';
import ContestSubmissionsTable from './admin/ContestUsers.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/add-recipe" element={<AddRecipePage />} />
                <Route path ="/contact" element={<Contact/>}/>
                <Route path="/about" element ={<About/>}/>
                <Route path ="/services" element ={<Services/>}/>
                <Route path ="/faq" element ={<FAQ/>}/>
                <Route path ="/terms" element ={<Terms/>}/>
                <Route path ="/profile" element ={<ProfilePage/>}/>
                <Route path="/recipe-list" element={<RecipeListPage />} />
                <Route path="/form" element={<RecipeContestApplication />} />
                <Route path="/adminpage" element={<Admin/>}/>
                <Route path="/admin" element={<Admin />}>
                    <Route path="recipes" element={<AdminRecipePage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="contest" element={<ContestSubmissionsTable />} />

                    {/* Add other routes under the Admin layout */}
                </Route>

                

            </Routes>
            
            {isLoggedIn && <ChatbotBubble />}
            <Footer />
        </BrowserRouter>
    );
};
export default App;
