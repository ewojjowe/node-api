const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

// create products
router.post('', productController.createProducts)

// get products
router.get('', productController.getProducts)

// get product by ID
router.get('/:id', productController.getProduct)

// update product by id
router.put('/:id', productController.updateProduct)

// delete product by id
router.delete('/:id', productController.deleteProduct)

module.exports = router
