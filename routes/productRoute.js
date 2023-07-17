const express = require('express')
const productController = require('../controllers/productController')
const validateAuth = require('../middlewares/validateTokenMiddleware')
const router = express.Router()

// create products
router.post('', validateAuth, productController.createProducts)

// get products
router.get('', validateAuth, productController.getProducts)

// get product by ID
router.get('/:id', validateAuth, productController.getProduct)

// update product by id
router.put('/:id', validateAuth, productController.updateProduct)

// delete product by id
router.delete('/:id', validateAuth, productController.deleteProduct)

module.exports = router
