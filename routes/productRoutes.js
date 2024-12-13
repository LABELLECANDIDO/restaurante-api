const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController'); // Certifique-se do caminho correto

// Rotas relacionadas aos produtos
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/restaurant/:restaurantId', ProductController.getProductsByRestaurant);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;