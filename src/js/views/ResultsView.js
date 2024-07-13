/*
 *  Project: starter
 *  File: ResultsView.js
 *  Created: 10:00 SA, 12/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import View  from './View';


class ResultsView extends View {
	_parentElement = document.querySelector('.results');
	_errorMessage = 'No recipes found! Please try another one!';
	_message = '';
	
	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join('');
	}
	
	_generateMarkupPreview(result) {
		return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
	}
}

export default new ResultsView();
