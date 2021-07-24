import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import PaginationView from './views/paginationView.js';

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

    // 3. Render Results (By Default 1 Page Rendered)
    resultsView.render(model.getTenSearchResults());

    // 4. Render Pagination
    PaginationView.render(model.state.search);
  } catch (error) {

  }
}
// SearchResultsController();

const controlPagination = function(goToPage){
  console.log(goToPage);
  // 1. Render New Page Items
  resultsView.render(model.getTenSearchResults(goToPage));

  // 2. Render New Paginantions
  PaginationView.render(model.state.search);
}


const controlServings = function(newServings){
  // Updating the Recipe Servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  RecipeView.render(model.state.recipe);
}


const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(SearchResultsController);
  PaginationView.addEventClicked(controlPagination);
}
init();