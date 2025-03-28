import express from "express"
import * as controller from '../controllers/usuariosController.js';
//import jwt from "jsonwebtoken"
export const usuariosRoutes = express.Router();

// const validateAccessToken = (req, res, next) => {
//   //console.log("A Authorization é: " + req.headers.authorization)
//   const accessToken = req.headers.authorization.split(' ')[1];
//   try {
//     const decodedTokenPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_SECRET);
//     console.log("Passei Token")
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({name: 'TokenExpiredError', message: 'jwt expired'});
//     } else {
//       return res.status(401).json({name:error.name, message:'Acesso negado'});
//     }
//   }
// };

// try {
//   const refreshToken = req.headers['refresh-token-jwt']
//   const decodedRefreshTokenPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET)
//   const newAccessToken = generateAccessToken(decodedRefreshTokenPayload)
//   res.setHeader('Authorization', `Bearer ${newAccessToken}`);
//   next();
// } catch (refreshError) {
//   // Se a renovação falhar, envie uma resposta 401 (não autorizado)
//   res.status(401).send('Acesso negado');
// }

// Rota para criar um novo usuário
usuariosRoutes.post('/', controller.novo);

// Rota para deletar usuário
usuariosRoutes.delete('/', controller.removeAll);

// Rota para deletar usuário
usuariosRoutes.delete('/:id', controller.remove);

// Rota para update usuário
usuariosRoutes.put('/:id', controller.alterar);

// Rota para listar todos os usuários
usuariosRoutes.get('/', controller.getAllUsuarios);

// Rota para efetuar login
//usuariosRoutes.post('/login', controller.login);

// Rota para buscar um usuário por ID
usuariosRoutes.get('/id/:id_usuarios', controller.getUsuariosById);

// Rota para buscar um usuário por USENAME
usuariosRoutes.get('/username/:username', controller.getUsuarioByUsername);

// Rota para buscar por paginação
//expressjwt({secret: "fabiane", algorithms: ["HS256"]})
usuariosRoutes.post('/pagination', controller.getUsuariosByPage);

// Rota para buscar o total de usuários
usuariosRoutes.get('/count', controller.getUsuariosCount);

usuariosRoutes.post('/refresh-token', controller.getRefreshToken)

usuariosRoutes.get('/componente/:id_componente', controller.getUsuarioByIdComponente)

usuariosRoutes.get('/componentes/:nome', controller.getUsuarioByNomeComponente)

export default usuariosRoutes; // Exporte o router para ser usado em index.js