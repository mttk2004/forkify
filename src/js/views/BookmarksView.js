/*
 *  Project: starter
 *  File: BookmarksView.js
 *  Created: 2:52 CH, 14/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */

import View  from './View';
import previewView from './PreviewView';


class BookmarksView extends View {
	_parentElement = document.querySelector('.bookmarks__list');
	_errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
	_message = '';
	
	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}
	
	_generateMarkup() {
		return this._data
		           .map(bookmark => previewView.render(bookmark, false))
		           .join('');
	}
}

export default new BookmarksView();
