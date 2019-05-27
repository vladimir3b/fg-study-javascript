const express = require('express');

const config = require('./../../../config.json');
const generateMenu = require('./menu');

const details = config['details'];
const siteStructure = config['site-structure'];
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
    const menu = generateMenu(siteStructure);
    siteStructure.pages.forEach(page => {
      this[_router].get(page.route, (request, response) => {
        response.render(page.location, {
          pageTitle: page.title,
          chapterTitle: details.chapterTitle,
          menu: menu,
          details: (page.code === 'home') ? details : null
        });
      });
    });
  }
}


module.exports = new Router();