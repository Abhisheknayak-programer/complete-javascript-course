import { async } from "regenerator-runtime"
import { API_URL } from "./config";
import { Getjson } from "./helpers";

export const state = {
    recipe : {}
}

//  Loading Recipe
export const loadRecipe = async function(id){
    try {
        const data = await Getjson(`${API_URL}/${id}`);
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
        console.log(state.recipe);
    } catch (error) {
        console.log(`💥${error}💥`);
    }
}