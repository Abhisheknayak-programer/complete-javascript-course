import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './searchView.js';

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



const SearchResultsController = async function(){
  try {
    // 1. Get Search Query
    const SearchQuery = SearchView.getQuery();
    if(!SearchQuery) return;

    // 2. Load Search Query
    await model.LoadSearchResults(SearchQuery);

    // 3. Render Results
    console.log(model.state.search.results);
  } catch (error) {
    recipeView.renderError();
  }
}
SearchResultsController();


const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(SearchResultsController);
}
init();