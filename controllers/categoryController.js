const expressAsyncHandler = require('express-async-handler');
const Category = require('../models/category');

const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const getCategoryById = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({
        code: 404,
        message: 'Categoría no encontrada',
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const createCategory = expressAsyncHandler(async (req, res) => {
  const { name, description, difficulty, risk, season, places, img } = req.body;

  // Se toman las opciones permitidas directamente desde el esquema
  const allowedNames = Category.schema.path('name').enumValues;
  const allowedDifficulties = Category.schema.path('difficulty').enumValues;
  const allowedRisks = Category.schema.path('risk').enumValues;
  const allowedSeasons = Category.schema.path('season').enumValues;
  const allowedPlaces = Category.schema.path('places').enumValues;

  // Verifica que los valores proporcionados están en las listas permitidas
  if (
    !allowedNames.includes(name) ||
    !allowedDifficulties.includes(difficulty) ||
    !allowedRisks.includes(risk) ||
    !allowedSeasons.includes(season) ||
    !allowedPlaces.includes(places)
  ) {
    return res.status(400).json({
      code: 400,
      message: 'Contenido inválido',
    });
  }

  try {
    const categoryExists = await Category.exists({ name });
    if (categoryExists) {
      return res.status(400).json({
        code: 400,
        message: 'La categoría ya existe',
      });
    }

    const newCategory = await Category.create({
      name,
      description,
      difficulty,
      risk,
      season,
      places,
      img,
    });

    if (newCategory) {
      return res.status(201).json({
        _id: newCategory._id,
        name: newCategory.name,
        description: newCategory.description,
        difficulty: newCategory.difficulty,
        risk: newCategory.risk,
        season: newCategory.season,
        places: newCategory.places,
        img: newCategory.img,
      });
    } else {
      return res.status(500).json({
        code: 500,
        message: 'Ha ocurrido un error',
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
  const { name, description, difficulty, risk, season, places, img } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    // Se toman las opciones permitidas directamente desde el esquema
    const allowedNames = Category.schema.path('name').enumValues;
    const allowedDifficulties = Category.schema.path('difficulty').enumValues;
    const allowedRisks = Category.schema.path('risk').enumValues;
    const allowedSeasons = Category.schema.path('season').enumValues;
    const allowedPlaces = Category.schema.path('places').enumValues;

    // Verifica que los valores proporcionados están en las listas permitidas
    if (
      !allowedNames.includes(name) ||
      !allowedDifficulties.includes(difficulty) ||
      !allowedRisks.includes(risk) ||
      !allowedSeasons.includes(season) ||
      !allowedPlaces.includes(places)
    ) {
      return res.status(400).json({
        code: 400,
        message: 'Valores inválidos'
      });
    }

    if (category) {
      category.name = name;
      category.description = description;
      category.difficulty = difficulty;
      category.risk = risk;
      category.season = season;
      category.places = places;
      category.img = img;

      const updatedCategory = await category.save();

      return res.status(200).json({
        _id: updatedCategory._id,
        name: updatedCategory.name,
        description: updatedCategory.description,
        difficulty: updatedCategory.difficulty,
        risk: updatedCategory.risk,
        season: updatedCategory.season,
        places: updatedCategory.places,
        img: updatedCategory.img,
      });
    } else {
      res.status(404);
      throw new Error('Categoría no encontrada');
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.deleted_at = Date.now();
      await category.save();
    } else {
      res.status(404).json({
        code: 404,
        message: 'Categoría no encontrada',
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Error al eliminar categoría',
    });
  }
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
