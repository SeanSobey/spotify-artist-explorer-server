//@ts-check
'use strict';

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {import('express').Request} request Cloud Function request context. More info: https://expressjs.com/en/api.html#req
 * @param {import('express').Response} response Cloud Function response context. More info: https://expressjs.com/en/api.html#res
 * @returns {void}
 */
exports.server = (request, response) => {
	response.send('Hello World!');
};