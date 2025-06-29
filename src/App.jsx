import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import RecipeDetails from './components/RecipeDetails';

function AppWrapper() {
  // const location = useLocation();
  // const isHome = location.pathname === '/';

  return (
    <div
      className="min-h-screen w-full bg-gray-950 text-gray-100 transition-all duration-500"
    >
      <header className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
        <h1 className="text-3xl sm:text-4xl text-center font-bold text-white py-6 tracking-wide drop-shadow-md">
          🍽️ Our Recipe Finder
        </h1>
      </header>

      <main className="px-4 sm:px-8 md:px-16 py-10">
        <Routes>
          <Route path="/" element={<Searchbar />} />
          <Route path="/recipe/:recipeID" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
