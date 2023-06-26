const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: 'Producto no encontrado'
      })
    }

    return res.status(200).json(product);
  } catch(error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    dimensions,
    name,
    category_id,
    description,
    weight,
    material,
    price,
    stock,
    img,
    fabricant,
    model,
    color,
    recommended_age,
    recommended_genre,
  } = req.body;

  const product = new Product({
    dimensions,
    name,
    category_id,
    description,
    weight,
    material,
    price,
    stock,
    img,
    fabricant,
    model,
    color,
    recommended_age,
    recommended_genre,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    dimensions,
    name,
    category_id,
    description,
    weight,
    material,
    price,
    stock,
    img,
    fabricant,
    model,
    color,
    recommended_age,
    recommended_genre,
  } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        code: 404,
        message: 'Producto no encontrado'
      });
    } else {
      product.dimensions = dimensions || product.dimensions;
      product.name = name || product.name;
      product.category_id = category_id || product.category_id;
      product.description = description || product.description;
      product.weight = weight || product.weight;
      product.material = material || product.material;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.img = img || product.img;
      product.fabricant = fabricant || product.fabricant;
      product.model = model || product.model;
      product.color = color || product.color;
      product.recommended_age = recommended_age || product.recommended_age;
      product.recommended_genre = recommended_genre || product.recommended_age;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        code: 404,
        message: 'Producto no encontrado'
      })
    } else {
      product.deleted_at = Date.now();
      await product.save();
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
