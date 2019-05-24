const express = require('express');
const siteStructure = require('./../../../.config/site-structure.json');

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
    siteStructure.pages.forEach(page => {
      this[_router].get(page.route, (request, response) => {
        response.render(page.location, {
          pageTitle: page.title,
          chapterTitle: siteStructure.chapterTitle,
          menu: siteStructure.menu
        });
      });
    });
  }
}

module.exports = new Router();