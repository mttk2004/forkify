import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import { loadSearchResults } from './model';


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    
    // 1. Loading recipe
    await model.loadRecipe(id);
    
    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    console.log('hi');
    const query = searchView.getQuery();
    if (!query) return;
    
    resultsView.renderSpinner();
    
    await loadSearchResults(query);
    
    resultsView.render(model.state.search.results)
  } catch(err) {
    recipeView.renderError();
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
