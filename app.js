require('dotenv').config();
const express = require('express');
const OptionsCaching = require('./cache.js');
const indexRoute = require('./routes/indexRoute.js');

class ExpressApp {
  app = express();
  port = process.env.PORT;
  optionsCaching = new OptionsCaching();

  constructor() {
    this.setupMiddlewares();
    this.cacheOptionsData();
    this.startServer();
  }

  setupMiddlewares = () => {
    this.app.use(express.json());
    this.app.use('/api', indexRoute);
  };

  startServer = () => {
    this.app.listen(this.port, () => {
      console.log(this.port, '포트로 서버가 열렸어요');
    });
  };

  cacheOptionsData = async () => await this.optionsCaching.setCachedOptions();
}

new ExpressApp();
