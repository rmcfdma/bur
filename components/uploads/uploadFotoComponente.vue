<template>
    Foto
    <el-upload :show-file-list="false" :disabled="disabled" ref="uploadRef" class="avatar-uploader" :action="urlUpload"
        :on-success="handleAvatarSuccess" :auto-upload="false" :on-change="onChange" :before-upload="beforeAvatarUpload"
        :on-preview="handlePicturePreview" :on-remove="handleRemove" :before-remove="beforeRemove">
        <div class="conteiner">
            <el-icon v-if="imageData && estado_form === 3" class="icon-delete-foto" @click.stop="handleRemove">
                <Delete />
            </el-icon>
            <el-icon v-if="imageData && estado_form === 3" class="icon-zoomin-foto" @click.stop="handlePicturePreview">
                <ZoomIn />
            </el-icon>
        </div> 
        <el-image id="avatar" v-loading="loading" v-if="!imageData && (estado_form === 1 || estado_form === 2)"
            :src="`${$config.public.FRONTEND_BASE_URL}/img/componentes/default.jpg`" style="width: 150px; height: 200px" />
        <el-image id="foto" v-loading="loading" v-if="imageData && (estado_form === 2 || estado_form === 3)"
            :src="imageData" style="width: 150px; height: 200px" />
        <el-icon v-if="!imageData && estado_form === 3" class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
        <el-image w-full :src="imageData" alt="Preview Image" />
    </el-dialog>
    {{ imageData?.length }}
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, type UploadProps } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadInstance, UploadProgressEvent } from 'element-plus'

const uploadRef = ref<UploadInstance>()
const imageData = ref<string | undefined>(undefined)
const tamanhoImagem = 4
const urlUpload = ref('')
const disabled = ref(true)
const estado_form = ref(1)
const loading = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePicturePreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const handleRemove = (file: UploadFile) => {
    imageData.value = undefined
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //imageData.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('A imagem deve ter o formato JPG!')
        return false
    } else if (rawFile.size / 1024 / 1024 > tamanhoImagem) {
        ElMessage.error(`O tamanho da imagem não pode ultrapassar ${tamanhoImagem}M!`)
        return false
    }
    return true
}

const onChange: UploadProps['onChange'] = async (uploadFile, uploadFiles) => {
    const reader = new FileReader()
    reader.onload = (event) => {
        imageData.value = event.target?.result as string
    }
    reader.readAsDataURL(uploadFile.raw!)
}

const beforeRemove: UploadProps['beforeRemove'] = async (uploadFile, uploadFiles) => {
    try {
        await ElMessageBox.confirm(`Deseja cancelar a transferência de ${uploadFile.name} ?`);
        return true;
    } catch {
        return false;
    }
}

const clearFiles = () => {
    uploadRef.value?.clearFiles()
}

const upload = (cpf: string) => {
    const runtimeConfig = useRuntimeConfig(); 
    urlUpload.value = `${runtimeConfig.public.API_BASE_URL}/files/upload/foto?cpf=${cpf}`
    uploadRef.value!.submit()
}

defineExpose({ upload, disabled, imageData, clearFiles, estado_form, loading })
</script>

<style scoped>
.avatar-uploader {
    text-align: left;
}

.avatar-uploader .avatar {
    width: 100%;
    display: block;
}

.icon-delete-foto {
    position: absolute;
    top: 90%;
    left: 90%;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
    font-size: 24px;
    color: #c8c9cc;
}

.icon-zoomin-foto {
    position: absolute;
    top: 90%;
    left: 70%;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
    font-size: 24px;
    color: #c8c9cc;
}

.icon-delete-foto:hover {
    color: #a0cfff;
}

.icon-zoomin-foto:hover {
    color: #a0cfff;
}

.conteiner {
    z-index: 1
}
</style>



<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

}

#foto:hover {
    opacity: 0.5;

}

.avatar-uploader .enabled .el-upload {
    cursor: pointer;
}

.avatar-uploader .disabled .el-upload {
    cursor: default;
}



.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 200px;
    text-align: center;

}
</style>
