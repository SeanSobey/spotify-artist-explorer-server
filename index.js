//@ts-check
'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const envy = require('envy-optional');
const util = require('util');

const config = envy(undefined, { checkPermissions: false });

const spotifyApi = new SpotifyWebApi({
	clientId: config.spotifyClientId,
	clientSecret: config.spotifyClientSecret,
	redirectUri: config.spotifyRedirectUri,
});
/**@type {Array<string>}*/
const allowOrigins = config.allowOrigins.split(';').map((origin) => origin.toLowerCase());
/**@type {boolean}*/
const logging = config.logging.toLowerCase() === 'true';

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

	try {
		if (request.method == 'OPTIONS') {
			return response.status(204).send('');
		}
		const origin = request.header('Origin');
		if (allowOrigins.includes('*')) {
			response.header('Access-Control-Allow-Origin', '*');
		} else if (!origin) {
			return response.status(400).send('Require origin header');
		} else if (allowOrigins.includes(origin.toLowerCase())) {
			response.header('Access-Control-Allow-Origin', origin);
		} else {
			return response.send();
		}
		response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		const code = request.query.code;
		if (!code) {
			return response.status(400).send('Require code query parameter');
		}
		return spotifyApi.authorizationCodeGrant(code)
			.then((data) => {
				if (logging) {
					console.debug('success', util.inspect(request), util.inspect(response));
				}
				return response.json(data.body);
			})
			.catch((/**@type {Error}*/error) => {
				if (logging) {
					console.error('error', error, util.inspect(request), util.inspect(response));
				}
				return response.status(500).send(error.message);
			});
	} catch (/**@type {Error}*/error) {
		if (logging) {
			console.error('error', error, request, response);
		}
		return response.status(500).send(error.message);
	}
};