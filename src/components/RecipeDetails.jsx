import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetails() {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error:', error);
        setRecipe(null);
      }
    };
    fetchData();
  }, [recipeID]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe?.[`strIngredient${i}`];
      const measure = recipe?.[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (!recipe) {
    return (
      <p className="text-center text-gray-300 text-lg mt-16 font-medium animate-pulse">
        Loading the recipe...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-8 text-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
            {recipe.strMeal}
          </h2>

          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-md mx-auto mb-6"
          />

          <div className="grid sm:grid-cols-2 gap-4 text-gray-300 mb-8">
            <p><span className="font-semibold text-white">📂 Category:</span> {recipe.strCategory}</p>
            <p><span className="font-semibold text-white">🌍 Area:</span> {recipe.strArea}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-3">🧂 Ingredients:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {getIngredients().map((item, index) => (
                <li key={index}>
                  <span className="font-medium text-white">{item.ingredient}</span> - {item.measure}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-3">👩‍🍳 Instructions:</h3>
            <p className="leading-relaxed text-gray-300 whitespace-pre-line text-justify">
              {recipe.strInstructions}
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
