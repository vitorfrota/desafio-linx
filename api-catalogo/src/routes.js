const express = require('express');

const ProductController = require('./app/controllers/ProductController');

const routes = express.Router();

routes.get('/product/:product_id', ProductController.show);

module.exports = routes; 