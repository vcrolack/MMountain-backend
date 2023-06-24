const jwt = require('jsonwebtoken');

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        code: 403,
        message: 'Acceso denegado',
      });
    }
    next();
  };
};

module.exports = {
  verifyRole
}
