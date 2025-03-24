import fs from 'fs/promises'; // Import the fs promises API
import path from 'path';
import 'dotenv/config'
import {
    S3Client, PutObjectCommand,
    DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand
} from "@aws-sdk/client-s3";

// const getAWSS3Client = () => {
//     return new S3Client({
//         region: process.env.REGION,
//         credentials: {
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//         }
//     })
// }

const getAWSS3Client = () => {
    return new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    })
}

export const deleteObjectInBucketAWS = async (bucket, key) => {
    if (bucket && bucket.trim() !== '') {
        if (key && key.trim() !== '') {
            const s3Client = getAWSS3Client()
            try {
                const { Body } = await s3Client.send(
                    new DeleteObjectCommand({
                        Bucket: bucket,
                        Key: key,
                    })
                );
                return { "success": true, "message": "Remoção realizada com sucesso." };
            } catch (error) {
                console.log(error)
                return { "success": false, "message": "Não foi possível realizar a remoção." }
            }
        } else {
            return { "success": false, "message": "Caminho do objeto no bucket AWS S3 inválido." }
        }
    } else {
        return { "success": false, "message": "Bucket AWS S3 não fornecido ou inválido." }
    }
};

export const deleteObjectsInBucketAWS = async (bucket, array) => {
    if (bucket && bucket.trim() !== '') {
        if (array && array.length > 0) {
            try {
                const s3Client = getAWSS3Client()
                const { Body } = await s3Client.send(
                    new DeleteObjectsCommand({
                        Bucket: bucket,
                        Delete: { Objects: array },
                    })
                );
                return { "success": true, "message": "Exclusão realizada com sucesso." };
            } catch (error) {
                console.log(error)
                return { "success": false, "message": "Não foi possível realizar a exclusão da lista." };
            }
        } else {
            return { "success": false, "message": "Lista para exclusão não foi fornecida. " };
        }
    } else {
        return { "success": false, "message": "Bucket AWS S3 não fornecido. " };
    }
};

export const insertObjectInBucketAWS = async (bucket, key, body) => {
    if (bucket && bucket.trim() !== '') {
        if (key && key.trim() !== '') {
            if (body && body.trim() !== '') {
                const s3Client = getAWSS3Client()
                try {
                    const { Body } = await s3Client.send(
                        new PutObjectCommand({
                            Bucket: bucket,
                            Key: key,
                            Body: body,
                        })
                    );
                    return { "success": true, "message": "Objeto incluído com sucesso." };
                } catch (error) {
                    console.log(error)
                    return { "success": false, "message": "Não foi possível incluir o objeto." }
                }
            } else {
                return { "success": false, "message": "Conteúdo do objeto ausente." }
            }
        } else {
            return { "success": false, "message": "Caminho do objeto no bucket AWS S3 inválido." }
        }
    } else {
        return { "success": false, "message": "Bucket AWS S3 inválido." }
    }
};

export const loadImageDataOfAWSS3 = async (bucket, key) => {
    const client = getAWSS3Client();
    try {
        const data = await client.send(new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        }));
        return data
    } catch (err) {
        console.error(err);
        return undefined
    }
};

//console.log(await loadImageDataOfAWSS3("bandauniaoracional", "imagens/fotoscomponentes/05464688706.jpg"))




