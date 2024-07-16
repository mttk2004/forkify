/*
 *  Project: starter
 *  File: helper.js
 *  Created: 8:01 CH, 09/07/2024
 *  Author: Mai Tran Tuan Kiet
 *  "Family is where life begins and love never ends."
 */


import { TIMEOUT_SEC } from './config';


const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

export const getJSON = async function (url) {
	try {
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		
		if (!res.ok) throw new Error(data.message);
		
		return data;
	}
	catch (err) {
		throw err;
	}
};

export const sendJSON = async function (url, uploadData) {
	try {
		const fetchPro = fetch(url, {
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body   : JSON.stringify(uploadData),
		});
		
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	}
	catch (err) {
		throw err;
	}
};

export const AJAX = async function (url, uploadData = undefined) {
	try {
		const fetchPro = uploadData
		                 ? fetch(url, {
					method : 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body   : JSON.stringify(uploadData),
				})
		                 : fetch(url);
		
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	}
	catch (err) {
		throw err;
	}
};
