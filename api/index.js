import express from 'express';
import bodyParser from "body-parser"
import cors from "cors"
import usuariosRoutes from '../routes/usuariosRoutes.js'
// import { componentesRoutes } from '../routes/componentesRoutes.js'
// import { funcoesRoutes } from '../routes/funcoesRoutes.js'
// import { brudsRoutes } from '../routes/brudsRoutes.js'
// import { filesRoutes } from '../routes/filesRoutes.js'
// import { authRoutes } from '../routes/authRoutes.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/componentes', componentesRoutes);
// app.use('/api/funcoes', funcoesRoutes);
// app.use('/api/bruds', brudsRoutes);
// app.use('/api/files', filesRoutes);
// app.use('/api/auth', authRoutes);

export default app;