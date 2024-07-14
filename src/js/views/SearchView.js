/*
 *  Project: starter
 *  File: SearchView.js
 *  Created: 9:32 CH, 11/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

class SearchView {
	_parentElement = document.querySelector('.search');
	
	getQuery() {
		const query = this._parentElement.querySelector('.search__field').value;
		this._clearInput();
		return query;
	}
	
	_clearInput() {
		this._parentElement.querySelector('.search__field').value = '';
	}
	
	addHandlerSearch(handler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
