const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'API Server',
      title: 'Swaggertastic Docs!',
      version: '1.0.1'
    },
    host: 'localhost:3000',
    basePath: '',
    produces: ['application/json'],
    schemes: ['http'],
    securityDefinitions: {
      basicAuth: {
        type: 'basic'
      }
    }
  },
  basedir: ''../../lib/', //app absolute path
  files: ['./*.js'] //Path to the API handle folder
};
expressSwagger(options);
// start up a specific standalone swagger server on a specific port
app.listen(3100);