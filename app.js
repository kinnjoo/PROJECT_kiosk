const express = require('express');

class ExpressApp {
  app = express();
  port = 3000;

  constructor() {
    this.setupMiddlewares();
    this.startServer();
  }

  setupMiddlewares = () => {
    this.app.use(express.json());
    this.app.use('/', (req, res) => {
      res.send('Hello');
    });
  };

  startServer = () => {
    this.app.listen(this.port, () => {
      console.log(this.port, '포트로 서버가 열렸어요');
    });
  };
}

new ExpressApp();
