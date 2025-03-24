import express from "express"
import * as controller from '../controllers/componentesController.js';
import jwt from "jsonwebtoken"

export const componentesRoutes = express.Router();

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

// Rota para criar um novo componente
componentesRoutes.post('/', validateAccessToken, controller.create);

// Rota para deletar um componente
componentesRoutes.delete('/:id/:cpf', validateAccessToken, controller.remove);

// Rota para deletar vários componentes
componentesRoutes.delete('/', validateAccessToken, controller.removeAll);

// Rota para update de um componente
componentesRoutes.put('/:id', validateAccessToken, controller.edit);

// Rota para listar todos os componentes
componentesRoutes.get('/', validateAccessToken, controller.getAllComponentes);

// Rota para buscar um componentes por ID
componentesRoutes.get('/id/:id_componente', validateAccessToken, controller.getComponenteAndBrudById);

// Rota para buscar um componentes por ID
componentesRoutes.get('/id2/:id_componente', validateAccessToken, controller.getComponenteById);

// Rota para buscar um componentes por Brud
componentesRoutes.get('/brud/:id_brud', validateAccessToken, controller.getComponentesByBrud);

// Rota para buscar um componentes por Nome
componentesRoutes.get('/nome/:nome', validateAccessToken, controller.getComponentesByName);

// Rota para buscar um componentes por Nome
componentesRoutes.get('/fullname/:fullname', validateAccessToken, controller.getComponenteByFullame);

// Rota para buscar um componentes por Data de Nascimento
componentesRoutes.get('/nascimento/:start/:end', validateAccessToken, controller.getComponentesByNascimento);

// Rota para buscar um componentes por CPF
componentesRoutes.get('/cpf/:cpf', validateAccessToken, controller.getComponentesByCpf);

// Rota para buscar um componentes por TEFA
componentesRoutes.get('/tefa/:tefa', validateAccessToken, controller.getComponentesByTefa);

// Rota para buscar um componentes por TEFA
componentesRoutes.get('/brud1/:brud', validateAccessToken, controller.getComponentesAndUsuariosByBrud);

// Rota para buscar o total de usuários
componentesRoutes.get('/count', validateAccessToken, controller.getComponentesCount);

componentesRoutes.post('/pagination', validateAccessToken, controller.getComponentesByPage);