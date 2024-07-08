import icons from '../img/icons.svg';
import 'regenerator-runtime/runtime'
import 'core-js/stable'

import * as model from './model';
import recipeView from './views/recipeView';


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

const renderSpinner = function(parentEl) {
  const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', html)
}

const recipesController = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    renderSpinner(recipeContainer);
    
    // 1. Loading recipe
    await model.loadRecipe(id);
    
    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err)
  }
}

const evts = ['hashchange', 'load']
evts.forEach(event => window.addEventListener(event, recipesController));
