'use strict';

require('dotenv').config();

// imports server file and starts server on PORT defined in .env file
require('./lib/server.js').start(process.env.PORT);
