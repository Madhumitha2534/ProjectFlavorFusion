package com.example.flavorfusion.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.flavorfusion.model.Recipe;
import com.example.flavorfusion.model.User;
import com.example.flavorfusion.repository.RecipeRepository;
import com.example.flavorfusion.repository.UserRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    // Save a recipe and update the user's recipe count
    public Recipe saveRecipe(Recipe recipe) {
        Recipe savedRecipe = recipeRepository.save(recipe);
        User user = userRepository.findByEmail(recipe.getUserEmail())
                      .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRecipeCount(user.getRecipeCount() + 1);  // Increment recipe count
        userRepository.save(user);
        return savedRecipe;
    }

    // Get all recipes
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Delete a recipe and update the user's recipe count
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                          .orElseThrow(() -> new RuntimeException("Recipe not found"));
        User user = userRepository.findByEmail(recipe.getUserEmail())
                      .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRecipeCount(user.getRecipeCount() - 1);  // Decrement recipe count
        userRepository.save(user);
        recipeRepository.delete(recipe);
    }

    // Get recipes by user email
    public List<Recipe> getRecipesByUserEmail(String userEmail) {
        return recipeRepository.findByUserEmail(userEmail);
    }
}
