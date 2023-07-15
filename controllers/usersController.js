const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { generateToken } = require('../utils/utils');
const customer = require('../models/customer');

const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al obtener los usuarios',
      error: error.message,
    });
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(400).json({
        code: 400,
        message: 'Usuario no encontrado',
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al obtener el usuario',
      error: error.message,
    });
  }
});

const createNewUser = expressAsyncHandler(async (req, res) => {
  try {
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
        customer: req.body.customer || null,
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
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al crear el usuario',
      error: error.message,
    });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      user.customer = req.body.customer || user.customer;
      user.address = req.body.address || user.address;
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
        updatedUser,
      });
    } else {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al actualizar el usuario',
      error: error.message,
    });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.deleted_at = Date.now();
      await user.save();

      res.json({
        id: req.params.id,
        message: 'Usuario eliminado',
      });
    } else {
      res.status(404).json({
        code: 404,
        message: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error al eliminar el usuario',
      error: error.message,
    });
  }
});

const restoreUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'Usuario no encontrado',
      });
    }
    if (user.deleted_at !== null) {
      user.deleted_at = null;
      await user.save();
      res.json({
        id: req.params.id,
        message: 'Usuario restaurado',
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'El usuario no está eliminado',
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

/* CONTROLADORES PARA USO DE CUSTOMERS */
const updatePassword = expressAsyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const requestedId = req.params.id;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (userId !== requestedId) {
      return res.status(401).json({
        code: 401,
        message: 'No autorizado',
      });
    }

    const user = await User.findById(req.params.id);
    if (user) {
      user.password = bcrypt.hashSync(req.body.newPassword, 10);
      try {
        await user.save();
        res.json({
          code: 200,
          message: 'Contraseña actualizada',
        });
      } catch (error) {
        res.status(500).json({
          code: 500,
          message: 'Ha ocurrido un error al actualizar el usuario',
          error: error.message,
        });
      }
    } else {
      res.status(401).json({
        code: 401,
        message: 'No autorizado',
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

const showProfile = expressAsyncHandler(async (req, res) => {
  let user;
  const token = req.cookies.token;
  const requestedId = req.params.id;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (userId !== requestedId) {
      return res.status(401).json({
        code: 401,
        message: 'No autorizado',
      });
    }

    user = await User.findById(req.params.id).select('-password');
    return res.status(200).json({
      code: 200,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Ha ocurrido un error',
      error: error.message,
    });
  }
});

const updateProfile = expressAsyncHandler(async (req, res) => {
  let user;
  const token = req.cookies.token;
  const requestedId = req.params.id;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (userId !== requestedId) {
      return res.status(401).json({
        code: 401,
        message: 'No autorizado',
      });
    }

    user = await User.findById(req.params.id).select('-password');

    if (user) {
      user.name = req.body.name || user.name;
      user.lastname = req.body.lastname || user.lastname;
      user.customer = req.body.customer;
      user.customer.updated_at = Date.now();
    }

    try {
      const updatedUser = await user.save();

      return res.status(200).json({
        code: 200,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Ha ocurrido un error',
        error: error.message,
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

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  updatePassword,
  deleteUser,
  restoreUser,
  showProfile,
  updateProfile,
};
