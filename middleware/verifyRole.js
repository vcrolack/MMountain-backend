const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

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
