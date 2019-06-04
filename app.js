//@ts-check
'use strict';

const express = require('express');
const envy = require('envy-optional');
const { server } = require('./index');

const config = envy(undefined, { checkPermissions: false });

const app = express();

app.get('/', server);

app.listen(config.port, () => console.log(`App listening on port ${config.port}`));