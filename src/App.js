import React, { useState, useEffect } from 'react';
import Recipes from './recipes';
import './App.css';

const App = () => {
  const APP_ID = "f1d86199";
  const APP_KEY = "13025ef616e3cc6f1af87e184a24a9ea";
  

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
