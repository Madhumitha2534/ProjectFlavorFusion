package com.example.flavorfusion.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.flavorfusion.model.Recipe;


public interface RecipeRepository extends JpaRepository<Recipe, Long> {
	 List<Recipe> findByUserEmail(String email);
	 Optional<Recipe> getRecipeById(Long id);
	 
}