import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList({ recipes, loading }) {
  if (loading) {
    return (
      <p className="text-center text-gray-400 font-medium text-lg mt-10 animate-pulse">
        🔎 Searching for recipes...
      </p>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 italic text-base mt-10">
        No recipes found. Try something else!
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 px-4 sm:px-6 lg:px-8">
      {recipes.map((item) => (
        <li
          key={item.idMeal}
          className="bg-gray-900 rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <Link to={`/recipe/${item.idMeal}`} className="block group">
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-52 object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors duration-200">
                {item.strMeal}
              </h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
