import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model';
import recipeView from './views/recipeView';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    
    // 1. Loading recipe
    await model.loadRecipe(id);
    
    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err)
  }
}

const events = ['hashchange', 'load']
events.forEach(event => window.addEventListener(event, controlRecipes));
