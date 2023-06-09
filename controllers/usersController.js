const User = require('../models/user');
const { generateToken } = require('../utils/utils');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(400).json({
      code: 400,
      message: 'Usuario no encontrado',
    });
  }
  res.json(user);
});

const createNewUser = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400).json({
      code: 400,
      message: 'El usuario ya existe',
    });
  }

  try {
    const user = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 10),
      created_at: Date.now(),
      updated_at: null,
      deleted_at: null,
      client: req.body.client || null,
    });

    const authToken = generateToken(user._id, user.role);

    res.cookie('token', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (user) {
      res.status(201).json({
        ...user,
        token: authToken,
      });
    } else {
      res.status(400);
      throw new Error('Datos inválidos');
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al crear el usuario',
      error: error.message,
    });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.address.address = req.body.address?.address || user.address.address;
    user.address.state = req.body.address?.state || user.address.state;
    user.address.region = req.body.address?.region || user.address.region;
    user.address.zip = req.body.address?.zip || user.address.zip;
    user.address.houseOrDept =
      req.body.address?.houseOrDept || user.address.houseOrDept;
    user.address.numberDept =
      req.body.address?.numberDept || user.address.numberDept;
    user.role = req.body.role || user.role;
    user.birthdate = req.body.birthdate || user.birthdate;
    user.gender = req.body.gender || user.gender;
    user.sports = req.body.sports || user.sports;
    user.img = req.body.img || user.img;
    user.updated_at = Date.now();

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      updatedUser
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

const updatePassword = expressAsyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (user) {
    user.password = req.body.newPassword;
    await user.save();

    res.json({
      code: 200,
      message: 'Contraseña actualizada',
    });
  } else {
    res.status(401).json({
      code: 401,
      message: 'No autorizado',
    });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.deleted_at = Date.now();
    await user.save();

    res.json({
      id: req.params.id,
      message: 'Usuario eliminado',
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  updatePassword,
  deleteUser,
};
