import * as model from './model.js';
import RecipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';


const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Loading The recipe
const controlRecipe = async () =>{
 try {
   const id = window.location.hash.slice(1);

  if(!id) return;
  recipeView.LoadSpinner();


  //1. Loading Recipe
  await model.loadRecipe(id);

  // Rendering the recipe
  RecipeView.render(model.state.recipe);

} catch (error) {
   alert(error);
 }
}







// Listening For the Hash and load of window
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

// More Modern Way for Above Two Codes
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));