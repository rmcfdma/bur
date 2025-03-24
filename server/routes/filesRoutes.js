import express from "express"
import * as controller from '../controllers/filesController.js';
import multer from 'multer';

export const filesRoutes = express.Router();

// const storage = multer.diskStorage(
//   {
//     destination: 'assets/img/componentes',
//     filename: (req, file, cb) => { cb(null, file.originalname); },
//   }
// );

const storage = multer.memoryStorage()

const upload = multer({ storage });


// Rota para listar todos os usuários
filesRoutes.post('/upload/foto', upload.single('file'), controller.uploadAWSBucketFotoComponentes);

// Rota para para saber se uma determinado arquivo se encontra no servidos
filesRoutes.delete('/fotoaws/:id', controller.deleteAWSBucketFotoComponente);

// Rota para para saber se uma determinado arquivo se encontra no servidos
filesRoutes.delete('/fotosaws', controller.deleteAWSBucketFotosComponente);


// Rota para para saber se uma determinado arquivo se encontra no servidos
filesRoutes.get('/exists', controller.fileExists);

// Rota para para saber se uma determinado arquivo se encontra no servidos
//filesRouters.get('/teste', controller.teste);


