import express from "express"
import jwt from "jsonwebtoken"
export const authRoutes = express.Router();

const validateAccessToken = (req, res, next) => {
  const headersauthorization = req.headers.authorization
  if (headersauthorization) {
    const accessToken = headersauthorization.split(' ')[1];
    try {
      const decodedTokenPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_SECRET);
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ name: 'TokenExpiredError', message: 'jwt expired' });
      } else {
        return res.status(401).json({ name: error.name, message: 'Acesso negado' });
      }
    }
  } else {
    return res.status(401).json({ name: 'NoAutorizationHeader', message: 'No Autorization Header' });
  }
};

// Rota para criar um novo componentepara validar o token
authRoutes.get('/', validateAccessToken, async (req, res) => {
  res.status(201).json({ "resultado": true });
});
