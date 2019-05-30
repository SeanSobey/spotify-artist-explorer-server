//@ts-check
'use strict';

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const envy = require('envy-optional');

const config = envy(undefined, { checkPermissions: false });

const app = express();
const spotifyApi = new SpotifyWebApi({
	clientId: config.spotifyClientId,
	clientSecret: config.spotifyClientSecret,
	redirectUri: config.spotifyRedirectUri,
});

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/', (request, response) => {
	const code = request.query.code;
	if (!code) {
		return response.status(403).send('Require code query parameter');
	}
	return spotifyApi.authorizationCodeGrant(code)
		.then((data) => {
			return response.json(data.body);
		})
		.catch((error) => {
			return response.status(500).send(error);
		});
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));