import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';

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
    resultsView.LoadSpinner();

    // 1. Get Search Query
    const SearchQuery = SearchView.getQuery();
    if(!SearchQuery) return;

    // 2. Load Search Query
    await model.LoadSearchResults(SearchQuery);

    // 3. Render Results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (error) {

  }
}
SearchResultsController();


const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(SearchResultsController);
}
init();