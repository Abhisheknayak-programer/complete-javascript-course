import { async } from "regenerator-runtime"

export const state = {
    recipe : {}
}

//  Loading Recipe
export const loadRecipe = async function(id){
    try {
        const Api = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        const Recipe__Main = await fetch(Api);
        if(!Recipe__Main.ok) throw new Error(`${Recipe__Main.message} ${Recipe__Main.status}`);
        
        const recipe__data = await Recipe__Main.json();
        const recipe = recipe__data.data.recipe;
      
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
        alert(error);
    }
}