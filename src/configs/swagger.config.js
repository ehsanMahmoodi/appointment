const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      failOnErrors: true,
      info: {
        title: "نوبت آنلاین دکتر",
        version: "1.0.0",
      },
      servers: [
        {
          name: "develop",
          url: "http://localhost:3000",
        },
      ],
      tags: [
        {
          name: "Auth",
        },
        {
          name: "User",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });
  const swagger = swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      validatorUrl: false,
      defaultModelsExpandDepth: -1,
    },
    explorer: true,
  });
  app.use("/api/swagger", swaggerUi.serve, swagger);
};
module.exports = { swaggerConfig };
