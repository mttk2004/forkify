/*
 *  Project: starter
 *  File: model.js
 *  Created: 8:26 CH, 08/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { API_URL } from './config';
import { getJSON } from './helper';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
}

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        
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
    } catch (err) {
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        
        const data = await getJSON(`${API_URL}?search=${query}`);
        
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                imageUrl: rec.image_url,
                title: rec.title,
                publisher: rec.publisher,
            }
        })
    } catch(err) {
        throw err;
    }
}
