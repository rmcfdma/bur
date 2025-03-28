import express from 'express';
// import bodyParser from "body-parser"
// import cors from "cors"
// import { PrismaClient } from '@prisma/client'
// import { usuariosRoutes } from './routes/usuariosRoutes.js'

// const prisma = new PrismaClient()
const app = express();
// app.use(bodyParser.json());
// app.use(cors());
app.get('/api', (req, res) => res.send('Express on Vercel'));
//app.use('/api/usuarios', usuariosRoutes);

//app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;