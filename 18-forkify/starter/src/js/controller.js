import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const LoadSpinner = (ParentElement) =>{
  const markup = `
  <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
  </div>`;
  ParentElement.innerHTML = '';
  ParentElement.insertAdjacentHTML('afterbegin',markup);
}





// Loading The recipe
const ShowRecipe = async () =>{
 try {
   const id = window.location.hash.slice(1);

   if(!id) return;

   LoadSpinner(recipeContainer);
  //  Loading Recipe
  const Api = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
  const Recipe__Main = await fetch(Api);
  if(!Recipe__Main.ok) throw new Error(`${Recipe__Main.message} ${Recipe__Main.status}`);
  
  const recipe__data = await Recipe__Main.json();
  let recipe = recipe__data.data.recipe;

  recipe = {
    id : recipe.id,
    title : recipe.title,
    publisher : recipe.publisher,
    sourceUrl : recipe.source_url,
    image : recipe.image_url,
    servings : recipe.servings,
    cookingTime : recipe.cooking_time,
    ingredients : recipe.ingredients
  }



  // Rendering the recipe
        const recipe_html = ` 
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">4</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          
        ${recipe.ingredients.map(ing => {
          return ` 
          <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`
        }).join('')}


        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;

  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin',recipe_html);
  console.log(recipe);

} catch (error) {
   alert(error);
 }
}

// ShowRecipe();







// Listening For the Hash and load of window
// window.addEventListener('hashchange',ShowRecipe);
// window.addEventListener('load',ShowRecipe);

// More Modern Way for Above Two Codes
['hashchange','load'].forEach(event => window.addEventListener(event,ShowRecipe));