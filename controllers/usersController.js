const User = require('../models/user');
const { generateToken } = require('../controllers/commonController');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  const user = await User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    address: {
      address: req.body.address.address,
      state: req.body.address.state,
      region: req.body.address.region,
      zip: req.body.address.zip,
      houseOrDept: req.body.address.houseOrDept,
      numberDept: req.body.address.numberDept,
    },
    role: req.body.role,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    sports: req.body.sports,
    img: req.body.img,
    create_at: Date.now(),
    updated_at: null,
    deleted_at: null,
  });

  const authToken = generateToken(user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      role: user.role,
      birthdate: user.birthdate,
      gender: user.gender,
      sports: user.sports,
      img: user.img,
      create_at: user.create_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      token: authToken,
    });

    res.cookie('token', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
  } else {
    res.status(400);
    throw new Error('Datos inválidos');
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
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      address: updatedUser.address,
      role: updatedUser.role,
      birthdate: updatedUser.birthdate,
      gender: updatedUser.gender,
      sports: updatedUser.sports,
      img: updatedUser.img,
      create_at: updatedUser.create_at,
      updated_at: updatedUser.updated_at,
      deleted_at: updatedUser.deleted_at,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      code: '401',
      message: 'No autorizado',
    });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'No autorizado',
    });
  }

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

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const authToken = generateToken(user._id);

    res.cookie('token', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: authToken,
    });
  } else {
    res.status(401);
    throw new Error('Email o contraseña inválida');
  }
});

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  updatePassword,
  deleteUser,
  authUser,
};
