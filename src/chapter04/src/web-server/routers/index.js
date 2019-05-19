const express = require('express');

const _router = Symbol('_router');
const _getRoutes = Symbol('_getRoutes');


class Router {
  constructor() {
    this[_router] = express.Router();
    this[_getRoutes]();
  }
  get router() {
    return this[_router];
  }

  [_getRoutes]() {
    this[_router].get('/', (request, response) => {
      response.render('root', {
        pageTitle: 'Study RxJs - Home Page'
      });
    })
  }
}

module.exports = new Router();