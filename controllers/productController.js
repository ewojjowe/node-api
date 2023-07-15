const Product = require('../models/productModels')

const createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      res.status(500).json({ message: `Cannot create product` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    if (!products) {
      res.status(404).json({ message: `Cannot find any products` })
      return
    }
    res.status(200).json(products)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find any product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body)
    const product = await Product.findById(id)
    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find the product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      res.status(404).json({ message: `Cannot find product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
