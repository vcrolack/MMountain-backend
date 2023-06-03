const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

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

module.exports = { generateToken, validateToken };
