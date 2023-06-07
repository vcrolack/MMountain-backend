const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/utils');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const authToken = generateToken(user._id, user.role);

    res.cookie('token', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: authToken,
    });
  } else {
    res.status(401).json({
      code: 401,
      message: 'Email o contraseña incorrectos',
    });
  }
});

const validateToken = expressAsyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      code: 401,
      message: 'No se ha iniciado sesión',
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decoded);
});

module.exports = {
  authUser,
  validateToken,
};
