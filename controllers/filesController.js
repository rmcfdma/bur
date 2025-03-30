import fs from 'fs/promises'; // Import the fs promises API
import path from 'path';
import {
    S3Client, PutObjectCommand,
    DeleteObjectCommand } from "@aws-sdk/client-s3";

const getAWSS3Client = () => {
    return new S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })
}

export const uploadAWSBucketFotoComponentes = async (req, res) => {
    const cpf = req.query.cpf;
    const fileData = req.file.buffer;
    if (cpf && cpf.trim() !== '') {
        if (cpf && cpf.trim() !== '') {
            const s3Client = getAWSS3Client()
            const fileName = `${cpf}${path.extname(req.file.originalname).toLowerCase()}`;
            try {
                const { Body } = await s3Client.send(
                    new PutObjectCommand({
                        Bucket: 'imagensbur',
                        Key: `fotoscomponentes/${fileName}`,
                        Body: fileData,
                    })
                );
                res.json({ "success": true, "message": "Foto incluída com sucesso." });
            } catch (error) {
                console.log(error)
                res.status(500).json({ "success": false, "message": "Não foi possível incluir a foto." })
            }
        } else {
            res.status(500).json({ "success": false, "message": "Identificação da foto inválida." })
        }
    } else {
        res.status(500).json({ "success": false, "message": "Conteúdo da foto ausente." })

    }
};

export const deleteAWSBucketFotoComponente = async (req, res) => {
    const cpf = req.params.id;
    if (cpf && cpf.trim() !== '') {
        const s3Client = getAWSS3Client()
        try {
            const { Body } = await s3Client.send(
                new DeleteObjectCommand({
                    Bucket: 'imagensbur',
                    Key: `fotoscomponentes/${cpf}.jpg`,
                })
            );
            res.json({ "success": true, "message": "Foto Removida com sucesso." });
        } catch (error) {
            console.log(error)
            res.status(500).json({ "success": false, "message": "Não foi possível remover a foto." })
        }
    } else {
        res.status(500).json({ "success": false, "message": "Identificação da foto inválida." })
    }
};

export const deleteAWSBucketFotosComponente = async (req, res) => {
    const array = req.body;
    if (array && array.length > 0) {
        const adapted = array.map((value) => {
            return { Key: `fotoscomponentes/${value}.jpg` }
        })
        try {
            const s3Client = getAWSS3Client()
            const { Body } = await s3Client.send(
                new DeleteObjectsCommand({
                    Bucket: 'imagensbur',
                    Delete: { Objects: adapted },
                })
            );
            res.json({ "success": true, "url": `Excluído - aws-s3::imagensbur/fotoscomponentes/${adapted}.jpg` });
        } catch (error) {
            console.log(error)
            res.status(500).json({ "success": false, "url": `Excluído - aws-s3::imagensbur/fotoscomponentes/${adapted}.jpg` });
        }
    }
};

export const uploadLocalStorage = async (req, res) => {
    const cpf = req.query.cpf;
    const fileData = req.file.buffer;
    console.log(path.extname(req.file.originalname))
    const fileName = `${cpf}${path.extname(req.file.originalname).toLowerCase()}`;
    await saveImage(fileName, '/assets/img/componentes/', fileData);
    res.send({ success: true, url: `/img/fotos/${fileName}` });
};

const saveImage = async (fileName, url, fileData) => {
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, url, fileName);
    try {
        await fs.writeFile(filePath, fileData);
        console.log('Arquivo gravado com sucesso:', filePath);
    } catch (error) {
        console.error('Erro ao tentar gravar o arquivo:', error);
    }
};

export const fileExists = async (req, res) => {
    const { url, fileName } = req.query
    //console.log(`Na API a URL é: ${url} e o nome é: ${fileName}.`)
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, url, fileName);
    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.json({ exists: true })
    } catch (error) {
        res.json({ exists: false })
    }
}

