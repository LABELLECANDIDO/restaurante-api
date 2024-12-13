const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

// Rotas relacionadas a restaurantes
router.get('/', RestaurantController.getAllRestaurants);
router.get('/:id', RestaurantController.getRestaurantById);
router.post('/', RestaurantController.createRestaurant);
router.put('/:id', RestaurantController.updateRestaurant);
router.delete('/:id', RestaurantController.deleteRestaurant);

module.exports = router;