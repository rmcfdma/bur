import express from "express"
import * as controller from '../controllers/funcoesController.js';
export const funcoesRoutes = express.Router();
// // Rota para criar um novo usuário
// router.post('/usuarios', usuariosController.createUsuario);

// Rota para listar todos os usuários
funcoesRoutes.get('/', controller.getAllFuncoes);

// Rota para efetuar login
funcoesRoutes.get('/id/:id_funcoes', controller.getFuncoesById);

// Rota para efetuar login
funcoesRoutes.get('/funcao/:funcao', controller.getFuncoesByFuncao);