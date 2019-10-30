'use strict';

require('dotenv').config();

// starting server on the PORT provided in environment variable 
require('./lib/server.js').start(process.env.PORT);
