import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default class AwsService {
    protected s3client: S3Client;

    constructor(region: string, accessKeyId: string, secretAccessKey: string) {
        const runtimeConfig = useRuntimeConfig();
        this.s3client = new S3Client({
            region: region,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            }
        })
    }

    getUrlPreAssinada = async (bucket: string, key: string) => {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        try {
            const url = await getSignedUrl(this.s3client, command, { expiresIn: 3600 });
            return url;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    getObjectCommand = async (bucket: string, key: string) => {
        try {
            const data = await this.s3client.send(new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            }));
            return data
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
}