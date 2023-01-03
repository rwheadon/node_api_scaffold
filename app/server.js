const makeApp = require("./app");
const port = 3088;
const { logger } = require("./logging");

makeApp()
  .then((app) => {
    // use app to do other express related configs here
    app.listen(port);
  })
  .then(() => {
    logger.info(`App running on port ${port}...`);
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: ("Caught an error %s", err),
    });
  });
