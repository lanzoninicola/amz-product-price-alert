//const packageJson = require("../../package.json");

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3333,
  //  version: packageJson.version
};

export default config;
