/*
 *  Project: starter
 *  File: SearchView.js
 *  Created: 9:32 CH, 11/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

class SearchView {
	#parentElement = document.querySelector('.search')
	
	getQuery() {
		const query = this.#parentElement.querySelector('.search__field').value;
		this.#clearQuery();
		return query;
	}
	
	addHandlerSearch(handler) {
		this.#parentElement.addEventListener('submit', function(e) {
			e.preventDefault();
			handler();
		})
	}
	
	#clearQuery() {
		this.#parentElement.querySelector('.search__field').value = '';
	}
}

export default new SearchView();
