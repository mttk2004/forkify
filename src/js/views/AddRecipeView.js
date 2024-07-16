/*
 *  Project: starter
 *  File: AddRecipeView.js
 *  Created: 9:36 SA, 16/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import View from './View';


class AddRecipeView extends View {
	_parentElement = document.querySelector('.upload');
	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.nav__btn--add-recipe');
	_btnClose = document.querySelector('.btn--close-modal');
	_message = 'Recipe was successfully uploaded';
	
	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}
	
	_addHandlerShowWindow() {
		this._btnOpen.addEventListener('click', this._toggleWindow);
	}
	
	_addHandlerHideWindow() {
		this._btnClose.addEventListener('click', this._toggleWindow);
		this._overlay.addEventListener('click', this._toggleWindow);
	}
	
	_addHandlerUpload(handler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			
			const dataArr = [...(new FormData(this))];
			const data = Object.fromEntries(dataArr);
			handler(data);
		});
	}
	
	_toggleWindow = () => {
		this._window.classList.toggle('hidden');
		this._overlay.classList.toggle('hidden');
	};
}

export default new AddRecipeView();
