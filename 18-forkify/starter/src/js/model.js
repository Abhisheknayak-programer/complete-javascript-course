import { async } from "regenerator-runtime"
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { Getjson } from "./helpers";

export const state = {
    recipe : {},
    search : {
        query : '',
        results : [],
        page : 1,
        resultsPerPage : RESULTS_PER_PAGE,
    },
    bookmarks : []
}

//  Loading Recipe
export const loadRecipe = async function(id){
    try {
        const data = await Getjson(`${API_URL}${id}`);
        const recipe = data.data.recipe;
      
         state.recipe = {
          id : recipe.id,
          title : recipe.title,
          publisher : recipe.publisher,
          sourceUrl : recipe.source_url,
          image : recipe.image_url,
          servings : recipe.servings,
          cookingTime : recipe.cooking_time,
          ingredients : recipe.ingredients
        }

        if(state.bookmarks.some(bookmark => bookmark.id === id)){
            state.recipe.bookmarked = true;
        }else{
            state.recipe.bookmarked = false;
        }

    } catch (error) {
        throw error;
    }
}

export const LoadSearchResults = async function(Query){
    try{
        state.search.query = Query;
        const data = await Getjson(`${API_URL}?search=${Query}`);
        state.search.results = data.data.recipes;

        state.search.results.map(recipe =>{
            return {
                id : recipe.id,
                title : recipe.title,
                publisher : recipe.publisher,
                image : recipe.image_url,
            }
        });
        state.search.page = 1;
    }catch(err){
        throw err;
    }
}



export const getTenSearchResults = function(page = state.search.page){
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start,end);
}


export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing =>{
        const quantityPerServing = ing.quantity / state.recipe.servings;
        ing.quantity = quantityPerServing * newServings;
    });

    state.recipe.servings = newServings;
}


// Adding Bookmarks to the localstorage
const persistBookmark = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}


export const AddBookMark = function(recipe){
    // Add Bookmark
    state.bookmarks.push(recipe);

    // Mark Current Recipe If that is a Bookmarked
    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = true;
    }

    persistBookmark();
}


export const deleteBookMark = function(id){
    // Delete BookMarked
    const DeletingIndex = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(DeletingIndex,1);

    // Mark Current Recipe If that is a Bookmarked
    if(id === state.recipe.id){
        state.recipe.bookmarked = false;
    }

    persistBookmark();
}


const initBookmarksAtBeginFromLocalHost = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage){
        state.bookmarks = JSON.parse(storage);
    }
}
initBookmarksAtBeginFromLocalHost();