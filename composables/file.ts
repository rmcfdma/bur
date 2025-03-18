import fs from 'fs/promises';
import path from 'path';

export function useFile() {

    const saveImage = async (fileName: string, url: string, fileData: any) => {
        const __dirname = path.resolve();
        const filePath = path.join(__dirname, url, fileName);
        try {
            await fs.writeFile(filePath, fileData);
            console.log('Arquivo gravado com sucesso:', filePath);
        } catch (error) {
            console.error('Erro ao tentar gravar o arquivo:', error);
        }
    };

    const downloadImage = async (caminho: string, nome: string) => {
        const resposta = await fetch(caminho);
        const blob = await resposta.blob();
        const arquivo = new File([blob], caminho.split('/').pop() || `${nome}.jpg`, { type: resposta.headers.get('Content-Type') || 'image/png' });
        const urlDados = URL.createObjectURL(arquivo);
        return ref(urlDados);
      };

    return {
        saveImage,
        downloadImage,
    };

    
}