import express from 'express';
import bodyParser from "body-parser"
import cors from "cors"
import usuariosRoutes from '../routes/usuariosRoutes.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/usuarios', usuariosRoutes);

export default app;