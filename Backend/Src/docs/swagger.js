const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'My Scalable API', version: '1.0.0' },
    servers: [{ url: '/api/v1' }],
  },
  apis: ['./Src/**/*.js'],
};

module.exports = swaggerJSDoc(options);