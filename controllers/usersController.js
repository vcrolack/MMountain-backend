const User = require('../models/user');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const createNewUser = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error('Usuario ya existe');
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
      numberDept: req.body.address.numberDept
    },
    role: req.body.role,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    sports: req.body.sports,
    img: req.body.img,
    create_at: Date.now(),
    updated_at: null,
    deleted_at: null
  });

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
      token: generateToken(user._id),
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
    user.address.houseOrDept = req.body.address?.houseOrDept || user.address.houseOrDept;
    user.address.numberDept = req.body.address?.numberDept || user.address.numberDept;
    user.role = req.body.role || user.role;
    user.birthdate = req.body.birthdate || user.birthdate;
    user.gender = req.body.gender || user.gender;
    user.sports = req.body.sports || user.sports;
    user.img = req.body.img || user.img;
    user.updated_at = Date.now();

    if(req.body.password) {
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

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'Usuario eliminado' });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});



const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email o contraseña inválida');
  }
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
};
