<template>
    <PageHeader />
    <h1>Repertório - {{ title }}</h1>
    <div class="custom-tree-container">
        <el-tree style="max-width: 400px;" :data="data" node-key="id" highlight-current :props="defaultProps">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span class="custom-tree-node-links" v-if="isVisible(data)" @click.stop>
                        <a v-if="isVisible(data)" @click.stop="downloadPdf(data)">
                            <img decoding="async"
                                src="https://i0.wp.com/www.bandaracional.com.br/wp-content/uploads/2016/11/icon_pdf.png?resize=30%2C30"
                                alt="Download PDF" width="30" height="30" data-recalc-dims="1">
                        </a>
                        <a v-if="isVisible(data)" style="margin-left: 8px" @click.stop="downloadSibelius(data)">
                            <img decoding="async"
                                src="https://i0.wp.com/www.bandaracional.com.br/wp-content/uploads/2020/03/icon_sibelius.png?resize=30%2C30"
                                alt="Download Sibelius" width="30" height="30" data-recalc-dims="1">
                        </a>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts" setup>
import json_repertorio from '@/assets/json/repertorio.json';
import type { ElTree } from 'element-plus';

const title = ref("")
const data = ref<Tree[]>([])
const route = useRoute()
const tipo = ref(route.params.tipo)
const pdfViewer = ref(null);
const { $awsService } = useNuxtApp()

interface Tree {
    id: string
    label: string
    children?: Tree[]
}

const defaultProps = {
    children: 'children',
    label: 'label',
}

const defineKey = (data: Tree, tipoDoc: string) => {
    // Seleciona se é partitura única ou não
    const tipo_musica = route.params.tipo;
    const musica = data.id.slice(0, 4);
    let key = ""
    if (data.id.length === 4)
        key = "partituras/" + tipoDoc + "/" + tipo_musica + "/" + musica + "/" + musica + ".pdf" // Partitura completa de arquivo único Ex.: partituras/r/r001/r001.pdf
    else if (data.id.length > 4)
        key = "partituras/" + tipoDoc + "/" + tipo_musica + "/" + musica + "/" + data.id + ".pdf" // Partitura por instrumento Ex.: partituras/r/r001/r001clarineta1.pdf
    return key
}

const downloadPdf = async (data: Tree) => {
    try {
        // Cria uma URL pré-assinada para o bucket e a key
        // do referido arquivo pdf e abre em uma nova aba do browser
        window.open(await $awsService.getUrlPreAssinada('bandauniaoracional', defineKey(data, "pdf")), '_blank')
    } catch (err) {
        console.error(err);
    }
}

const downloadSibelius = async (data: Tree) => {
    try {
        // Cria uma URL pré-assinada para o bucket e a key do referido arquivo 
        const presignedUrl = await $awsService.getUrlPreAssinada('bandauniaoracional', defineKey(data, "sibelius"))

        // Obtém o arquivo da URL pré-assinado
        const response = await fetch(presignedUrl);
        const blob = await response.blob();

        // Cria uma URL temporária para o blob
        const blobUrl = URL.createObjectURL(blob);

        // Cria um elemento link <a>
        const link = document.createElement('a');
        link.href = blobUrl; // URL para o download na AWS S3
        link.download = data.id + ".sib"; // Nome do arquivo a ser gravado

        // Adiciona um elemento link <a> no elemento body
        document.body.appendChild(link);

        // Dispara o evento click de <a> programaticamente
        link.click();

        // Remove <a> do documento
        document.body.removeChild(link);

        //  liberar a memória utilizada pelo objeto 
        //  Blob que foi criado anteriormente e associado a uma URL.
        URL.revokeObjectURL(blobUrl);
    } catch (err) { }

}

const isVisible = (data: Tree): boolean => {
    if (data.id.length === 4 || !data.children || (data.children && data.children.length === 0))
        return true
    //return /^\d+$/.test(data.id[data.id.length - 1])
    return false
}

watchEffect(async () => {
    // Percorre o json de músicas e busca por tipo Ex.: r (para músicas racionais)
    json_repertorio.filter((item, index, array) => {
        if (item.id === tipo.value) {
            title.value = item.label
            // Se o tipo de música tiver filhos Ex.: r001, r002
            if (item.children.length > 0) {
                data.value = item.children
            }
        }
    })
})

onMounted(async () => {

})
</script>
<style>
h1 {
    font-family: 'Pontano Sans', sans-serif;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: 'Pontano Sans', sans-serif;
    font-weight: 400;
}

.custom-tree-node-links {
    height: 40px;
    display: flex;
    /* Transforma o <span> que contém os links em um container flexbox */
    justify-content: center;
    /* Centraliza os links horizontalmente */
    align-items: center;
    /* Centraliza os links verticalmente */
}

.custom-tree-node-links a {
    width: 100%;
    /* Faz o link ocupar toda a largura do container */
    height: 100%;
    /* Faz o link ocupar toda a altura do container */
    display: flex;
    /* Transforma o link em um container flexbox */
    justify-content: center;
    /* Centraliza a imagem dentro do link horizontalmente */
    align-items: center;
    /* Centraliza a imagem dentro do link verticalmente */
}

.el-tree-node__content {
    /*padding: 4px;  Controla o espaçamento entre os nós*/
    height: 40px;
}
</style>
