const express = require('express');
const indexRoute = require('./routes/indexRoute.js');

class ExpressApp {
  app = express();
  port = 3000;

  constructor() {
    this.setupMiddlewares();
    this.startServer();
  }

  setupMiddlewares = () => {
    this.app.use(express.json());
    // this.app.use('/', (req, res) => {
    //   res.send('Hello');
    // });
    this.app.use('/api', indexRoute);
  };

  startServer = () => {
    this.app.listen(this.port, () => {
      console.log(this.port, '포트로 서버가 열렸어요');
    });
  };
}

new ExpressApp();
