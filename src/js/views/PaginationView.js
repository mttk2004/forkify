/*
 *  Project: starter
 *  File: PaginationView.js
 *  Created: 2:09 CH, 12/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import icons from '../../img/icons.svg'
import View  from './View';


class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');
	
	_generateMarkup() {
		const currentPage = this._data.page;
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		
		// Only one page
		if (numPages === 1 && currentPage === 1) {
			return '';
		}

		// First page
		if (numPages > 1 && currentPage === 1) {
			return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
		            <span>${currentPage + 1}</span>
		            <svg class="search__icon">
		              <use href="${icons}#icon-arrow-right"></use>
		            </svg>
		          </button>`
		}

		// Last page
		if (numPages > 1 && currentPage === numPages) {
			return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
			          <svg class="search__icon">
			            <use href="${icons}#icon-arrow-left"></use>
			          </svg>
			          <span>${currentPage - 1}</span>
			        </button>`;
		}

		// Middle page
		if (numPages > 1 && currentPage < numPages && currentPage > 1) {
			return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
			          <svg class="search__icon">
			            <use href="${icons}#icon-arrow-left"></use>
			          </svg>
			          <span>${currentPage - 1}</span>
			        </button>
			        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
		            <span>${currentPage + 1}</span>
		            <svg class="search__icon">
		              <use href="${icons}#icon-arrow-right"></use>
		            </svg>
		          </button>`;
		}
	}
	
	addHandlerClick(handler) {
		this._parentElement.addEventListener('click', function(e) {
			const btn = e.target.closest('.btn--inline');
			
			if (!btn) return;
			
			const gotoPage = +btn.dataset.goto;
			
			handler(gotoPage);
		})
	}
}

export default new PaginationView();
