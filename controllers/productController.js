const Product = require('../models/productModels')
const asyncHandler = require('express-async-handler')

const createProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      res.status(500)
      throw new Error(`Cannot create product`)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
    if (products && products.length === 0) {
      res.status(404)
      throw new Error(`Cannot find any products`)
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(`Cannot find any product with ID: ${id}`)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body)
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(`Cannot find and update the product with ID: ${id}`)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      res.status(404)
      throw new Error(`Cannot find and delete the product with ID: ${id}`)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

module.exports = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
