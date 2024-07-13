import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model';
import recipeView  from './views/RecipeView';
import searchView  from './views/SearchView';
import resultsView from './views/ResultsView';
import paginationView from './views/PaginationView';
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
    const query = searchView.getQuery();
    if (!query) return;
    
    resultsView.renderSpinner();
    
    await loadSearchResults(query);
    
    resultsView.render(model.getSearchResultsPage())
    
    paginationView.render(model.state.search)
  } catch(err) {
    recipeView.renderError();
  }
}

const controlPagination = async function(gotoPage) {
  // rendering new results
  resultsView.render(model.getSearchResultsPage(gotoPage))
  
  // rendering new buttons
  paginationView.render(model.state.search)
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
