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
    }
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
        // console.log(state.recipe);
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
        })

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