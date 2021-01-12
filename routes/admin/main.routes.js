const router = require('express').Router();
const productController = require('../../controllers/products.controller');

router.get('/', productController.getAllProductsToAdmin);

module.exports = router;