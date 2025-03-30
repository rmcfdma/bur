import express from "express"
import * as controller from '../controllers/componentesController.js';
//import jwt from "jsonwebtoken"

export const componentesRoutes = express.Router();

// const validateAccessToken = (req, res, next) => {
//   const headersauthorization = req.headers.authorization
//   if (headersauthorization) {
//     const accessToken = headersauthorization.split(' ')[1];
//     try {
//       const decodedTokenPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_SECRET);
//       next();
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         return res.status(401).json({ name: 'TokenExpiredError', message: 'jwt expired' });
//       } else {
//         return res.status(401).json({ name: error.name, message: 'Acesso negado' });
//       }
//     }
//   } else {
//     return res.status(401).json({ name: 'NoAutorizationHeader', message: 'No Autorization Header' });
//   }
// };

// Rota para criar um novo componente
componentesRoutes.post('/', controller.create);

// Rota para deletar um componente
componentesRoutes.delete('/:id/:cpf', controller.remove);

// Rota para deletar vários componentes
componentesRoutes.delete('/', controller.removeAll);

// Rota para update de um componente
componentesRoutes.put('/:id', controller.edit);

// Rota para listar todos os componentes
componentesRoutes.get('/', controller.getAllComponentes);

// Rota para buscar um componentes por ID
componentesRoutes.get('/id/:id_componente', controller.getComponenteAndBrudById);

// Rota para buscar um componentes por ID
componentesRoutes.get('/id2/:id_componente', controller.getComponenteById);

// Rota para buscar um componentes por Brud
componentesRoutes.get('/brud/:id_brud', controller.getComponentesByBrud);

// Rota para buscar um componentes por Nome
componentesRoutes.get('/nome/:nome', controller.getComponentesByName);

// Rota para buscar um componentes por Nome
componentesRoutes.get('/fullname/:fullname', controller.getComponenteByFullame);

// Rota para buscar um componentes por Data de Nascimento
componentesRoutes.get('/nascimento/:start/:end', controller.getComponentesByNascimento);

// Rota para buscar um componentes por CPF
componentesRoutes.get('/cpf/:cpf', controller.getComponentesByCpf);

// Rota para buscar um componentes por TEFA
componentesRoutes.get('/tefa/:tefa', controller.getComponentesByTefa);

// Rota para buscar um componentes por TEFA
componentesRoutes.get('/brud1/:brud', controller.getComponentesAndUsuariosByBrud);

// Rota para buscar o total de usuários
componentesRoutes.get('/count', controller.getComponentesCount);

componentesRoutes.post('/pagination', controller.getComponentesByPage);