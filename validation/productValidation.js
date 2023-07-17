const Joi = require('@hapi/joi')

const productValidation = (productData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    image: Joi.string(),
  })
  return schema.validate(productData)
}

module.exports = {
  productValidation,
}
