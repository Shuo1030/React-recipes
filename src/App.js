import React, { useState, useEffect } from 'react';
import Recipes from './recipes';
import './App.css';

const App = () => {
  const APP_ID = "your_app_id";
  const APP_KEY = "your_app_key";//check this two information by your own
  

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form onSubmit = {getSearch} className = "search-form">
        <input
        className = "search-bar"
        type = "text"
        value = {search}
        onChange = {updateSearch}
      />
      <button className = "search-button" type = "submit">
        search
      </button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe =>(
           <Recipes 
           title = {recipe.recipe.label}
           calories = {recipe.recipe.calories}
           image = {recipe.recipe.image}
           ingredients = {recipe.recipe.ingredients}
           />
      ))} 
      </div>      
    </div>
  );
}

export default App;
