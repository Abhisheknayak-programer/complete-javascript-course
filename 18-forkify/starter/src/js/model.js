import { async } from "regenerator-runtime"
import { API_URL } from "./config";
import { Getjson } from "./helpers";

export const state = {
    recipe : {},
    search : {
        query : '',
        results : [],
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