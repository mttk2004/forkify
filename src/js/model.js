/*
 *  Project: starter
 *  File: model.js
 *  Created: 8:26 CH, 08/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import { API_URL, KEY, RESULTS_PER_PAGE } from './config';
import { AJAX, getJSON, sendJSON }        from './helper';
import { async }                          from 'regenerator-runtime';


export const state = {
	recipe   : {},
	search   : {
		query         : '',
		results       : [],
		page          : 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
	bookmarks: [],
};

const createRecipeObject = function (data) {
	const { recipe } = data.data;
	return {
		id         : recipe.id,
		title      : recipe.title,
		publisher  : recipe.publisher,
		sourceUrl  : recipe.source_url,
		image      : recipe.image_url,
		servings   : recipe.servings,
		cookingTime: recipe.cooking_time,
		ingredients: recipe.ingredients,
		...(recipe.key && { key: recipe.key }),
	};
};

export const loadRecipe = async function (id) {
	try {
		const data = await AJAX(`${API_URL}${id}`);
		state.recipe = createRecipeObject(data);
		
		state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);
		
		console.log(state.recipe);
	}
	catch (err) {
		// Temp error handling
		console.error(`${err} 💥💥💥💥`);
		throw err;
	}
};

export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		
		const data = await AJAX(`${API_URL}?search=${query}`);
		console.log(data);
		
		state.search.results = data.data.recipes.map(rec => {
			return {
				id       : rec.id,
				title    : rec.title,
				publisher: rec.publisher,
				image    : rec.image_url,
				...(rec.key && { key: rec.key }),
			};
		});
		state.search.page = 1;
	}
	catch (err) {
		console.error(`${err} 💥💥💥💥`);
		throw err;
	}
};

export const getSearchResultsPage = function (page = state.search.page) {
	state.search.page = page;
	
	const start = (page - 1) * state.search.resultsPerPage; // 0
	const end = page * state.search.resultsPerPage; // 9
	
	return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach(ing => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
		// newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
	});
	
	state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
	// Add bookmark
	state.bookmarks.push(recipe);
	
	// Mark current recipe as bookmarked
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
	
	persistBookmarks();
};

export const deleteBookmark = function (id) {
	// Delete bookmark
	const index = state.bookmarks.findIndex(el => el.id === id);
	state.bookmarks.splice(index, 1);
	
	// Mark current recipe as NOT bookmarked
	if (id === state.recipe.id) state.recipe.bookmarked = false;
	
	persistBookmarks();
};

const persistBookmarks = function () {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const clearBookmarks = function () {
	localStorage.clear();
};

const init = function () {
	const storage = localStorage.getItem('bookmarks');
	
	if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
		                          .filter(
				                          entry => entry[0].startsWith('ingredient') && entry[1] !== '')
		                          .map(([_, ing]) => {
			                          const ingArr = ing.replaceAll(' ', '').split(',');
			                          if (ingArr.length !== 3) throw new Error('Wrong ingredients'
			                                                                   + ' format!');
			                          
			                          const [quantity, unit, description] = ingArr;
			                          return {
				                          quantity: quantity ? +quantity : null,
				                          unit,
				                          description
			                          };
		                          });
		const recipe = {
			title       : newRecipe.title,
			source_url  : newRecipe.sourceUrl,
			image_url   : newRecipe.image,
			publisher   : newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings    : +newRecipe.servings,
			ingredients,
		};
		console.log(recipe);
		
		const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
		console.log(data);
		state.recipe = createRecipeObject(data);
	}
	catch (err) {
		throw err;
	}
};

