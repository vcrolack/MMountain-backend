const expressAsyncHandler = require('express-async-handler');
const Category = require('../models/Category');

const getAllCategories = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

const getCategoryById = expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Categoría no encontrada');
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
    if (!allowedNames.includes(name)
    || !allowedDifficulties.includes(difficulty)
    || !allowedRisks.includes(risk)
    || !allowedSeasons.includes(season)
    || !allowedPlaces.includes(places)) {
      res.status(400);
      throw new Error('Uno o más valores proporcionados no son válidos');
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      res.status(400);
      throw new Error('Categoría ya existe');
    }

    const category = await Category.create({
        name,
        description,
        difficulty,
        risk,
        season,
        places,
        img
    });

    if (category) {
      res.status(201).json({
        _id: category._id,
        name: category.name,
        description: category.description,
        difficulty: category.difficulty,
        risk: category.risk,
        season: category.season,
        places: category.places,
        img: category.img
      });
    } else {
      res.status(400);
      throw new Error('Error al crear categoría');
    }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    const { name, description, difficulty, risk, season, places, img } = req.body;

    // Se toman las opciones permitidas directamente desde el esquema
    const allowedNames = Category.schema.path('name').enumValues;
    const allowedDifficulties = Category.schema.path('difficulty').enumValues;
    const allowedRisks = Category.schema.path('risk').enumValues;
    const allowedSeasons = Category.schema.path('season').enumValues;
    const allowedPlaces = Category.schema.path('places').enumValues;

    // Verifica que los valores proporcionados están en las listas permitidas
    if (!allowedNames.includes(name) || !allowedDifficulties.includes(difficulty) || !allowedRisks.includes(risk) || !allowedSeasons.includes(season) || !allowedPlaces.includes(places)) {
      res.status(400);
      throw new Error('Uno o más valores proporcionados no son válidos');
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

        res.json({
            _id: updatedCategory._id,
            name: updatedCategory.name,
            description: updatedCategory.description,
            difficulty: updatedCategory.difficulty,
            risk: updatedCategory.risk,
            season: updatedCategory.season,
            places: updatedCategory.places,
            img: updatedCategory.img
        });
    } else {
        res.status(404);
        throw new Error('Categoría no encontrada');
    }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(category) {
        await category.remove();
        res.json({ message: 'Categoría eliminada' });
    } else {
        res.status(404);
        throw new Error('Categoría no encontrada');
    }
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory };
