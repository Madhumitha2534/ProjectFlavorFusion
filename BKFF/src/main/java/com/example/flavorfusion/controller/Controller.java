package com.example.flavorfusion.controller;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.flavorfusion.model.Recipe;
import com.example.flavorfusion.model.User;
import com.example.flavorfusion.service.RecipeService;
import com.example.flavorfusion.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/register")
    public User post(@RequestBody User data) {
        return userService.postData(data);
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        return userService.login(email, password);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/add-recipe")
    public ResponseEntity<Recipe> addRecipe(
        @RequestParam("recipeName") String recipeName,
        @RequestParam("ingredients") String ingredients,
        @RequestParam("quantity") String quantity,
        @RequestParam("description") String description,
        @RequestParam("userEmail") String userEmail,
        @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            Recipe recipe = new Recipe();
            recipe.setRecipeName(recipeName);
            recipe.setIngredients(ingredients);
            recipe.setQuantity(quantity);
            recipe.setDescription(description);
            recipe.setUserEmail(userEmail);
            
            if (image != null && !image.isEmpty()) {
                // Convert image to base64 string
                String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
                recipe.setImage(base64Image);
            }

            Recipe savedRecipe = recipeService.saveRecipe(recipe);
            return ResponseEntity.ok(savedRecipe);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/recipe-list")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/user-recipes")
    public ResponseEntity<List<Recipe>> getRecipesByUserEmail(@RequestParam String email) {
        List<Recipe> recipes = recipeService.getRecipesByUserEmail(email);
        return ResponseEntity.ok(recipes);
    }

    @DeleteMapping("/recipes/delete/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
        try {
            recipeService.deleteRecipe(id);
            return new ResponseEntity<>("Recipe deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete recipe", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
