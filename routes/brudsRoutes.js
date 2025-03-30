import express from "express"
import * as controller from '../controllers/brudsController.js';
export const brudsRoutes = express.Router();
// Rota para listar todos os usuários
brudsRoutes.get('/', controller.getAllBruds);

// Rota para efetuar login
brudsRoutes.get('/id/:id_bruds', controller.getBrudById);

// Rota para efetuar login
brudsRoutes.get('/nome/:nome', controller.getBrudsByNome);

// Rota para efetuar login
brudsRoutes.get('/estado/:estado', controller.getBrudsByEstado);