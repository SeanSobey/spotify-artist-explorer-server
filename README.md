# spotify-artist-explorer-server
NodeJS server for the spotify artist explorer app, see the [browser client](https://github.com/SeanSobey/spotify-artist-explorer-client).

This is a simple app that handles the OAuth 2 `access token` -> `request token` for Spotify. It runs as a Google Cloud Function (GCF). See the [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/).

## Project setup

### Install node modules

```
npm install
```

### Create environment variable file

1) Copy `.env.example` -> `.env`.
2) Add a PORT, eg 3000.
3) If not already done, register a [Test App](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) on a dev account.
4) Add the client ID (`SPOTIFY_CLIENT_ID`), client secret (`SPOTIFY_CLIENT_SECRET`).
5) For local dev add the redirect url (`SPOTIFY_REDIRECT_URI`) as `'http://localhost:8080/auth.html'`.

## Run tests

```
npm run test
```
