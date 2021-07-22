import * as model from './model.js';
import RecipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';


const recipeContainer = document.querySelector('.recipe');

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
    recipeView.renderError();
 }
}


const init = function(){
  recipeView.addHandlerRender(controlRecipe);
}
init();