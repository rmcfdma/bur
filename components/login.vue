<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Login</span>
            </div>
        </template>

        <el-form status-icon ref="ruleFormRef" :rules="rules" :label-position="labelPosition" :model="form"
            label-width="80px">
            <el-form-item label="Usuário" prop="username">
                <el-input placeholder="Informe o usuário." v-model="form.username" />
            </el-form-item>
            <el-form-item label="Senha" prop="password">
                <el-input placeholder="Insira sua senha." show-password v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.rememberMe">Lembrar-me</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login(ruleFormRef)">Login</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { ElAlert, ElMessage } from 'element-plus'
import { authStore } from '@/store/auth';
import { breadcrumbsStore } from '@/store/breadcrumbs';

const { $usuarioService } = useNuxtApp()
const labelPosition = ref<FormProps['labelPosition']>('left')
const ruleFormRef = ref<FormInstance>()
const store = authStore();
const { setBreadcrumbs } = breadcrumbsStore();
const router = useRouter();

interface RuleForm {
    username: string
    password: string
}

const form = reactive({
    username: '',
    password: '',
    rememberMe: false,
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: 'Usuário Obrigatório.', trigger: 'blur' },
        { min: 3, max: 15, message: 'O Campo Usuário de ter entre 3 e 15 caracteres', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: 'Senha obrigatória.',
            trigger: 'change',
        },
    ]
})

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    const loading = ElLoading.service({
        lock: true,
        text: 'Efetuando login.',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                const resposta = await $usuarioService.authenticate(form.username, form.password)
                // 
                if (resposta.accessToken && resposta.refreshToken) {
                    store.setTokensInPinia(resposta.accessToken, resposta.refreshToken)
                    setBreadcrumbs([['1', 'Home', '/', 'Seja Bem Vindo']]);
                    await router.push('/')//Redireciona para Home
                } else {
                    store.clearTokensInPinia()
                    setBreadcrumbs([['8', 'login', '/login', 'Página de Login']]);
                    await router.push('/login')
                }
                ElMessage({ message: "Login efetuado com sucesso.", type: 'success' })
            } catch (error: any) {
                if (error.response){
                    console.log(error.response.status)
                    if (error.response.status === 401) {
                        ElMessage({ message: "Senha ou usuário incorreto.", type: 'error' })
                    } else if (error.response.status === 500) {
                        ElMessage({ message: "Sem conexão com o Banco de Dados.", type: 'error' })
                    }
            } 
            }
        } else {
            ElMessage({ message: "Preencha o formulário corretamente.", type: 'error' })
        }    })
    loading.close()
}
</script>
<style>
.box-card {
    width: 400px;
}
</style>
