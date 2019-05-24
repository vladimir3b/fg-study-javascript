const express = require('express');
const siteStructure = require('./../../../.config/site-structure.json');
const generateMenu = require('./parse-menu');

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
    const menu = generateMenu();
    siteStructure.pages.forEach(page => {
      this[_router].get(page.route, (request, response) => {
        response.render(page.location, {
          pageTitle: page.title,
          chapterTitle: siteStructure.chapterTitle,
          menu: menu
        });
      });
    });
  }
}


module.exports = new Router();