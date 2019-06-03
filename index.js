//@ts-check
'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const envy = require('envy-optional');

const config = envy(undefined, { checkPermissions: false });

const spotifyApi = new SpotifyWebApi({
	clientId: config.spotifyClientId,
	clientSecret: config.spotifyClientSecret,
	redirectUri: config.spotifyRedirectUri,
});

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {import('express').Request} request Cloud Function request context. More info: https://expressjs.com/en/api.html#req
 * @param {import('express').Response} response Cloud Function response context. More info: https://expressjs.com/en/api.html#res
 * @returns {import('express').Response}
 */
exports.server = (request, response) => {

	response.header('Content-Type', 'application/json');
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	if (request.method == 'OPTIONS') {
		return response.status(204).send('');
	}
	const code = request.query.code;
	if (!code) {
		return response.status(403).send('Require code query parameter');
	}
	return spotifyApi.authorizationCodeGrant(code)
		.then((data) => {
			response.json(data.body);
			console.debug('success', request, response);
			return response;
		})
		.catch((error) => {
			response.status(500).send(error);
			console.error('error', error, request, response);
			return response;
		});
};