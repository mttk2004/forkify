/*
 *  Project: starter
 *  File: model.js
 *  Created: 8:26 CH, 08/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { async } from 'regenerator-runtime';

export const state = {
    recipe: {},
}

export const loadRecipe = async function(id) {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    
    console.log(data);
    
    if (!res.ok)
        throw new Error(data.message)
    
    const {recipe} = data.data;
    state.recipe = {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title
    }
    console.log(state.recipe);
}
