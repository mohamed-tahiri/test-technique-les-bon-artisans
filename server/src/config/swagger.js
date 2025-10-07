const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Les Bons Artisans',
      version: '1.0.0',
      description: 'API REST pour gérer les produits',
    },
    servers: [
      { description: 'local', url: 'http://localhost:5001' },
      { description: 'Staging', url: 'http://api.lesbonartisons.dev' },
      { description: 'Production', url: 'https://api.lesbonartisons.com' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // fichiers contenant les annotations JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
