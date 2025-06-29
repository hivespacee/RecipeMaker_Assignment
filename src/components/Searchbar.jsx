import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';

export default function Searchbar() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setQuery(text);
  };

  useEffect(() => {
    if (!query.trim()) return;
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const json = await res.json();
        setData(json.meals || []);
      } catch (err) {
        console.error('Error while fetching the recipe:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [query]);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-stretch gap-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition"
          placeholder="🔍 Search for a delicious recipe..."
        />
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl focus:ring-2 focus:ring-gray-500 transition-all duration-300"
        >
          Search
        </button>
      </form>

      <RecipeList recipes={data} loading={loading} />
    </div>
  );
}
