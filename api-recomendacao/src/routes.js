const express = require('express');

import RecommendationController from './app/controllers/RecommendationController';
const routes = express.Router();

routes.get('/recommendation', RecommendationController.index);

module.exports = routes; 