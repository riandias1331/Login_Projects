const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), jwt_secret);
    req.user = decoded; // Adiciona os dados do usuário no objeto req
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};


module.exports = exports.authMiddleware;
