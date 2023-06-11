const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
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
    recommended_genre
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
    recommended_genre
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
    recommended_genre
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.dimensions = dimensions;
    product.name = name;
    product.category_id = category_id;
    product.description = description;
    product.weight = weight;
    product.material = material;
    product.price = price;
    product.stock = stock;
    product.img = img;
    product.fabricant = fabricant;
    product.model = model;
    product.color = color;
    product.recommended_age = recommended_age;
    product.recommended_genre = recommended_genre;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Producto removido' });
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
