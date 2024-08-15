import React, { useState, useEffect } from 'react';
import classes from './hero.module.css';
import meal from '../../assets/image.png';

const Hero = () => {
  const URL1 = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
  const URL2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=burger';
  const [chickenRecipe, setChickenRecipe] = useState(null);
  const [burgerRecipe, setBurgerRecipe] = useState(null);

  useEffect(() => {
    const fetchChickenRecipe = async () => {
      try {
        const res = await fetch(URL1);
        const data = await res.json();
        setChickenRecipe(data.meals[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChickenRecipe();
  }, []);

  useEffect(() => {
    const fetchBurgerRecipe = async () => {
      try {
        const res = await fetch(URL2);
        const data = await res.json();
        setBurgerRecipe(data.meals[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBurgerRecipe();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h2>Discover the Art of <br /><span className={classes.flavorFusion}>Flavor Fusion</span></h2>
          <h2>Hungry for <br /><span className={classes.mouthwatering}>mouthwatering dishes?</span></h2>
          <h5>Unleashing unique tastes and innovative recipes.</h5>
          <p className={classes.firstDesc}>Welcome to your destination for extraordinary flavors.</p>
          <p className={classes.secondDesc}>Explore our curated recipes and culinary creations.</p>
        </div>
        <div className={classes.right}>
          <img src={meal} alt="Delicious meal" />
          <div className={classes.chickenMeal}>
            <div className={classes.imgContainer}>
              <img src={chickenRecipe?.strMealThumb} alt={chickenRecipe?.strMeal} />
            </div>
            <h5>{chickenRecipe?.strMeal}</h5>
          </div>
          <div className={classes.burgerMeal}>
            <div className={classes.imgContainer}>
              <img src={burgerRecipe?.strMealThumb} alt={burgerRecipe?.strMeal} />
            </div>
            <h5>{burgerRecipe?.strMeal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
