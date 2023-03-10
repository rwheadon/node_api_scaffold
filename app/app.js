const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerParser = require("swagger-parser");
const { connector } = require("swagger-routes-express");
const { api } = require("./api");
const { logger } = require("./logging");

const makeApp = async () => {
  logger.info("Making app...");
  const parser = new swaggerParser();
  // this is the path to your OpenAPI file
  const apiDefinition = await parser.validate("./app/api/openapi.yaml");
  const connect = connector(api, apiDefinition); // make the connector
  const app = express(); // make the app
  // do any other app stuff, such as wire in passport, use cors etc
  app.use(express.json());
  // This is the endpoint that will display the swagger docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDefinition));
  connect(app); // attach the routes

  // add any error handlers last

  return app;
};

module.exports = makeApp;
