<template>
    <el-card class="box-card-dados-componente-cadastro">
        <template #header>
            <div class="card-header">
                <div class="state-form">
                        <el-icon v-if="estado_form !== 3" size="20px" color="red">
                        <Lock />
                    </el-icon>
                    <el-icon v-else size="20px" color="green">
                        <Unlock />
                    </el-icon>
                    </div>
                <div class="card-header">
                    <span>&nbsp;Cadastro do Componente - {{ label_card_header }}</span>
                </div>
            </div>
        </template>
        <el-form :model="componenteForm" label-width="110px" :rules="componenteFormRules" ref="componenteFormRef"
            label-position="top" class="form-componentes" status-icon>
            <el-row>
                <el-col :span="5">
                    <UploadsUploadFotoComponente ref="uploadRef" />
                </el-col>
                <el-col :span="19">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Nome" prop="NOME">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.NOME as string" placeholder="Nome" maxlength="45">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="CPF" prop="CPF">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.CPF as string"
                                    :placeholder="estado_form === 3 ? '___.___.___-__' : 'CPF'" :formatter="formatCpf"
                                    :parser="parseCpf" maxlength="11">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="TEFA" prop="TEFA">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.TEFA as string" placeholder="TEFA" :formatter="formatTefa"
                                    maxlength="6">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="5">
                            <el-form-item label="Nascimento" prop="NASCIMENTO">
                                <el-config-provider :locale="locale">
                                    <el-date-picker :readonly="estado_form === 2" :disabled="estado_form === 1"
                                        :editable="false" :clearable="false"
                                        :disabled-date="disabledDateNascimentoAfter"
                                        v-model="componenteForm.DATA_NASCIMENTO" type="date" label="Nascimento"
                                        placeholder="Nascimento" format="DD/MM/YYYY">
                                    </el-date-picker>
                                </el-config-provider>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="Logradouro" prop="LOGRADOURO">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.LOGRADOURO as string" placeholder="Logradouro"
                                    maxlength="45">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="Número" prop="NUMERO">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.NUMERO as string" :formatter="formatNumero"
                                    placeholder="Número" maxlength="6">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="CEP" prop="CEP">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.CEP as string"
                                    :placeholder="estado_form === 3 ? '__.___-___' : 'CEP'" maxlength="10"
                                    @input="inputCep" :formatter="formatCep" :parser="parseCep">
                                </el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="Bairro" prop="BAIRRO">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.BAIRRO as string" placeholder="Bairro" maxlength="45">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Cidade" prop="CIDADE">
                                <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                                    v-model="componenteForm.CIDADE as string" placeholder="Cidade" maxlength="45">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Estado" prop="ESTADO">
                                <el-select :disabled="estado_form === 1" v-model="componenteForm.ESTADO"
                                    placeholder="Estado" style="width: 100%;">
                                    <el-option :disabled="estado_form === 2"
                                        v-for="(item_estado, index_estado) in estados" :key="index_estado"
                                        :label="item_estado['nome']" :value="item_estado['sigla']" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="Telefone" prop="TELEFONE">
                        <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                            v-model="componenteForm.TELEFONE as string"
                            :placeholder="estado_form === 3 ? '(__) _____-____' : 'Telefone'"
                            :formatter="formatTelefone" :parser="parseTelefone" maxlength="15">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="E-mail" prop="EMAIL">
                        <el-input clearable :readonly="estado_form === 2" :disabled="estado_form === 1"
                            v-model="componenteForm.EMAIL as string" placeholder="E-mail" maxlength="45">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="Data de Inclusão" prop="DATA_INCLUSAO">
                        <el-config-provider :locale="locale">
                            <el-date-picker :readonly="estado_form === 2" :disabled="estado_form === 1"
                                :editable="false" :clearable="false" :disabled-date="disabledDateAfter"
                                v-model="componenteForm.DATA_INCLUSAO" type="date" placeholder="Inclusão"
                                format="DD/MM/YYYY">
                            </el-date-picker>
                        </el-config-provider>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="BRUD" prop="BRUD">
                        <el-select :readonly="estado_form === 2" :disabled="estado_form === 1"
                            v-model="componenteForm.ID_BRUDS" placeholder="BRUD" style="width: 100%">
                            <el-option :disabled="estado_form === 2" v-for="(brud, index) in bruds" :key="index"
                                :label="brud['NOME']" :value="brud['ID_BRUDS']">
                                <span style="float: left; color: var(--el-text-color-secondary);font-size: 13px;">{{
                                    brud['ESTADO'] }}</span>
                                <span style="float: left"> &nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <span style="float: left">{{ brud['NOME'] }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <br>
                    <TransfersTransferFuncoesComponentes ref="transferRef" />
                </el-col>
            </el-row>
        </el-form>
        <br>
        <el-button :disabled="estado_form === 3" plain type="primary" @click="novo">Novo</el-button>
        <el-button :disabled="estado_form !== 2" plain type="primary" @click="editar">Editar</el-button>
        <el-button :disabled="estado_form !== 3" plain type="primary"
            @click="salvar(componenteFormRef)">Salvar</el-button>
        <el-button :disabled="estado_form !== 3" plain type="primary"
            @click="cancelar(componenteFormRef)">Cancelar</el-button>
        <el-button :disabled="estado_form !== 2" plain type="primary"
            @click="remover(componenteForm)">Remover</el-button>
        <el-button :disabled="estado_form !== 3" plain type="primary"
            @click="limpar(componenteFormRef)">Limpar</el-button>
        <el-button :disabled="estado_form === 3" plain type="primary" @click="visualizarTabela">Localizar</el-button>
    </el-card>
</template>
<script lang="ts" setup>
import type {  FormInstance, FormRules, ElConfigProvider, ElOption, AutocompleteFetchSuggestions, FormItemProp } from 'element-plus'
import type { IComponente } from '~/types/IComponente';
import { ElMessage, ElMessageBox } from 'element-plus'
import ptBr from 'element-plus/dist/locale/pt-br.mjs';
import type { IFuncoesComponentes } from '~/types/IFuncoesComponente';
import { tableStore } from '~/store/table';
import { authStore } from '~/store/auth';
import { Lock, Unlock } from '@element-plus/icons-vue'

// Serviços registrados como plugin
const { $componenteService, $brudService, $utilService,
    $fileService, $awsService } = useNuxtApp()

// Funções do composable useComponente()    
const { formatCep, parseCep, formatTelefone, parseTelefone,
    formatCpf, parseCpf, validateCpf, formatTefa, parseTefa,
    formatNome, parseNome, ruleValidateCpf, ruleValidateTefa,
    ruleValidateDataInclusao, ruleValidateDataNascimento,
    ruleValidateTelefone, disabledDateAfter, disabledDateNascimentoAfter,
    getDataMinima, ruleValidateEmail, ruleValidateCep,
    formatNumero } = useComponente()

// Estados do Formulário de Componentes
// 1 - Localizando Componente - [Novo, Localizar]) 
// 2 - Mostrando Componente - [Novo, Editar, Remover, Localizar] 
// 3 - Preenchendo Componente (Editando ou Incluindo) - [Salvar, Cancelar, Limpar]
const estado_form = ref(1) // Estado do formulário. Iniciado com 1
const uploadRef = ref() // Referencia reativa ao componente de Upload
const locale = ptBr // Localização para o componente DataPicker
const estados = ref([]) // Array de estados da federação
const bruds = ref([]) // Array de BRUD's
const transferRef = ref() // Referencia reativa para o componente utilizado para atribuir funções ao componente
const componenteFormRef = ref<FormInstance>() // Referência reativa para o Formulário de componente 
const storeTable = tableStore(); // Store para persistência dos metadados do formúlario (qtd de páginas, páginal atua e etc)
const storeAuth = authStore(); // Store para persitência do usuario atual (Autenticado)
const emit = defineEmits(['show-table']); // Define um evento para ser emitido ao componente pai para que a tabela seja mostrada.
const props = defineProps(['componente']); // Define uma propriedade recebida pelo componente pai. Quando um componente é selecionado pela tabela o componente é refletido para esta propriedade.
const label_card_header = ref('Vazio...')

// Versão modificada da interface IComponente usando para representar o formulário.
interface ComponenteForm extends Omit<IComponente, "bruds" | "emprestimos" | "usuarios" | "funcoes_componentes"> {
    funcoes_componentes: FuncoesComponentes[];
}

// Versão modificada da interface IFuncoesFomponentes
interface FuncoesComponentes extends Omit<IFuncoesComponentes, "componentes" | "funcoes"> {
};

// Inicialização do formulario reativo de cadastro de coomponentes
let componenteForm = reactive<ComponenteForm>({
    ID_COMPONENTES: 0,
    NOME: '',
    CPF: '',
    DATA_NASCIMENTO: getDataMinima(),
    LOGRADOURO: '',
    NUMERO: '',
    BAIRRO: '',
    CIDADE: '',
    ESTADO: '',
    CEP: '',
    TELEFONE: '',
    EMAIL: '',
    FOTO: '',
    TEFA: '',
    DATA_INCLUSAO: new Date(),
    ID_BRUDS: 1,
    funcoes_componentes: []
})

// Prepara o formulário para incluir um novo componente
const novo = () => {
    limpar(componenteFormRef.value)
    estado_form.value = 3
}

// Prepara o formulário para editar um componente
const editar = () => {
    estado_form.value = 3
}

// Inclui um componente no banco de dados
const salvar_inclusao = async (componente: any) => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Incluindo o componente',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
        const comp: any = await $componenteService.create(componente);
        // Faz o upload da foto
        if (uploadRef.value.imageData && componenteForm.CPF && componenteForm.CPF.trim() !== "")
            uploadRef.value.upload(componenteForm.CPF)
        loading.close()
        ElMessage.success('Componente incluído com sucesso.')
        estado_form.value = 2
        return comp
    } catch (error) {
        loading.close()
        ElMessage.error('Não foi possível incluir o componente.')
        estado_form.value = 3
        return undefined
    }
}

// Altera um componente no banco de dados
const salvar_edicao = async (componente: any) => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Alterando o componente',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
        const object = compararArrays(funcoesComponentesToNumberArray(componenteForm.funcoes_componentes), transferRef.value.value)
        const inclusao: IFuncoesComponentes[] = object.inclusao.map((row) => {
            return { ID_FUNCOES: row, DATA_INICIO: componenteForm.DATA_INCLUSAO } as IFuncoesComponentes
        })
        const comp: any = await $componenteService.edit(componente, object.exclusao, inclusao);
        // Faz o upload da foto
        if (componenteForm.CPF && componenteForm.CPF.trim() !== "")
            uploadRef.value.upload(componenteForm.CPF)
        loading.close()
        ElMessage.success('Componente alterado com sucesso.')
        estado_form.value = 2
        return comp
    } catch (error) {
        loading.close()
        ElMessage.error('Não foi possível alterar o componente.')
        estado_form.value = 3
        return undefined
    }
}

// Verifica se é uma inclusão ou alteração e envia a foto pelo upload
const salvar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        // Verifica se os demais campos do formulário foram preenchidos corretamente
        if (valid) {
            // Verifica se foi atribuída ao menos 1 função ao componente
            if (transferRef.value.value && transferRef.value.value.length > 0) {
                // Verifica se foi inserida uma foto
                if (uploadRef.value.imageData && uploadRef.value.imageData.trim() !== "") {
                    // Salva a foto com o cpf. Ex.: 05464688706.jpg
                    componenteForm.FOTO = `${componenteForm.CPF}.jpg`
                    // Concatena as funcoes selecionadas, a data atual e o id do componente em um array funcoes_componentes 
                    const funcoes_componentes = adaptarFuncoesComponentes(transferRef.value.value, new Date)
                    // Cria o componente com as informações obtidas
                    const novo = { ...componenteForm, funcoes_componentes }
                    // Verifica se é uma inclusão
                    if (!componenteForm.ID_COMPONENTES || componenteForm.ID_COMPONENTES === 0) {
                        const result = salvar_inclusao(novo)
                    }
                    // Verifica se é uma edição
                    else if (componenteForm.ID_COMPONENTES && componenteForm.ID_COMPONENTES !== 0) {
                        const result = salvar_edicao(novo)
                    }
                } else {
                    // Caso não tenha sido inserida uma foto
                    ElMessage({ type: 'error', message: 'Foto não incluída.' })
                }
            } else {
                // Caso não tenha sido inserida nenhuma função
                ElMessage({ type: 'error', message: 'Atribua ao menos uma função ao componente.' })
            }
        }
    })
}

// Cancela uma inclusão ou uma edição
const cancelar = async (formEl: FormInstance | undefined) => {
    // Se estivermos cancelando uma edição
    if (componenteForm.ID_COMPONENTES && componenteForm.ID_COMPONENTES !== 0) {
        // Se a instância do formulário ainda não tiver sido criada interrompe a função
        if (!formEl) return
        // limpa todas as validações de um formulário, ou seja, remove todas as mensagens de erro que estão sendo exibidas para os campos do formulário
        formEl.clearValidate()
        const componente = await $componenteService.getComponenteById(componenteForm.ID_COMPONENTES)
        preencherFormulario(componente?.data)
        //Carrega a imagem que está em /assets/img/componentes
        //await loadImageData("/assets/img/componentes", `${componente?.data['CPF']}.jpg`)
        //Carrega a imagem que está no bucket aws
        await loadImageDataOfAWSS3("bandauniaoracional", `imagens/fotoscomponentes/${componente?.data['CPF']}.jpg`)
        const lista = componente?.data['funcoes_componentes'] as []
        transferRef.value.value = []
        lista.forEach((value: IFuncoesComponentes) => {
            transferRef.value.value.push(value.ID_FUNCOES)
        })
        estado_form.value = 2
        // Caso estajamos cancelando uma inserção
    } else {
        limpar(componenteFormRef.value)
        estado_form.value = 1
    }
}

const remover = (componente: ComponenteForm) => {
    if (componente.ID_COMPONENTES && componente.ID_COMPONENTES > 0) {
        if (componente.NOME && componente.NOME.trim() !== "") {
            handleDelete(componente)
        } else {
            ElMessage.error('Não é possível excluir um usuário sem o username.')
        }
    } else {
        ElMessage.error('O componente não possui um usuário cadastrado.')
    }
    estado_form.value = 1
}

const handleDelete = async (componente: ComponenteForm) => {
    ElMessageBox.confirm(
        'Deseja excluir o componente selecionado?',
        'Exclusão de Componente',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            const loading = ElLoading.service({
                lock: true,
                text: 'Removendo o componente',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            try {
                const user: any = await $componenteService.remove(componente);
                if (user.data.resultado === "1") {
                    limpar(componenteFormRef.value)
                    estado_form.value = 1
                    loading.close()
                    ElMessage({
                        type: 'success',
                        message: 'Componente removido com sucesso.',
                    })
                }
                else {
                    estado_form.value = 2
                    loading.close()
                    ElMessage({
                        type: 'error',
                        message: 'Não foi possível remover o componente.',
                    })

                }
            } catch (error) {
                estado_form.value = 2
                loading.close()
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível remover o componente.',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Remoção cancelada pelo usuário.',
            })
        })
}

const limpar = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.clearValidate()
    formEl.resetFields()
    transferRef.value.value = []
    uploadRef.value.imageData = ""
    uploadRef.value.clearFiles()
    componenteForm.ESTADO = "AC"
    await loadBruds()
    componenteForm.ID_BRUDS = bruds.value[0]['ID_BRUDS']
}

const localizar = () => {
    estado_form.value = 1
    visualizarTabela()
}

const visualizarTabela = async () => {
    try {
        const total = await $componenteService.getComponentesCount()
        if (total && total > 0) {
            storeTable.setTotal(total)
            storeTable.setCurrentPage(1)
            storeTable.setSizePage(5)
            emit('show-table', true)
        } else {
            if (storeAuth.isAuthenticated) {
                ElMessage({
                    message: 'Não há componentes a serem mostrados.',
                    type: 'error',
                })
            } else {
                ElMessage.error('Sua sessão expirou. Faça o login novamente.')
            }
        }
    } catch (error) {
        console.log(error)
        ElMessage.error('Não foi possível visualizar a tabela de componente.')
    }
}

const preencherFormulario = (componente: ComponenteForm) => {
    if (componente.ID_COMPONENTES && componente.ID_COMPONENTES > 0) {
        componenteForm.ID_COMPONENTES = componente.ID_COMPONENTES
        componenteForm.NOME = componente.NOME
        componenteForm.CPF = componente.CPF
        componenteForm.DATA_NASCIMENTO = componente.DATA_NASCIMENTO
        componenteForm.LOGRADOURO = componente.LOGRADOURO
        componenteForm.NUMERO = componente.NUMERO
        componenteForm.BAIRRO = componente.BAIRRO
        componenteForm.CIDADE = componente.CIDADE
        componenteForm.ESTADO = componente.ESTADO
        componenteForm.CEP = componente.CEP
        componenteForm.TELEFONE = componente.TELEFONE
        componenteForm.EMAIL = componente.EMAIL
        componenteForm.FOTO = componente.FOTO
        componenteForm.TEFA = componente.TEFA
        componenteForm.DATA_INCLUSAO = componente.DATA_INCLUSAO
        componenteForm.ID_BRUDS = componente.ID_BRUDS
        estado_form.value = 2
    } else {
        limpar(componenteFormRef.value)
        estado_form.value = 1
    }
}

const loadEstados = async () => {
    try {
        const e = await $utilService.getEstados();
        estados.value = e.estados
        //const estadosArray = e.estados.map((estado: { sigla: any; nome: any; }) => [estado.sigla, estado.nome]);
        //estados.value = estadosArray
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
    }
};

const loadBruds = async () => {
    try {
        bruds.value = await $brudService.getBruds();
    } catch (error) {
        console.error('Erro ao carregar as BRUDS:', error);
    }
};

const loadImageData = async (url: string, nome: string) => {
    const file = await $fileService.fileExists(url, nome)
    if (file)
        uploadRef.value.imageData = `/_nuxt/assets/img/componentes/${componenteForm.CPF}.jpg`
    else
        uploadRef.value.imageData = undefined
}

const loadImageDataOfAWSS3 = async (bucket: string, key: string) => {
    uploadRef.value.loading = true
    console.log(`O nome é: ${key}`)
    try {
        const data = await $awsService.getObjectCommand(bucket, key);
        if (data.Body) {
            uploadRef.value.imageData = `data:image/jpeg;base64,${await data.Body.transformToString('base64')}`
        }
    } catch (err) {
        console.error(err);
    }
    uploadRef.value.loading = false
};

const inputCep = async (value: string) => {
    if (value && value.trim() !== "" && value.length === 8) {
        const endereco = await $componenteService.getCep(parseCep(value))
        if (endereco) {
            //componenteForm.CEP = endereco.cep
            componenteForm.LOGRADOURO = endereco.logradouro
            componenteForm.BAIRRO = endereco.bairro
            componenteForm.CIDADE = endereco.localidade
            componenteForm.ESTADO = endereco.uf
        }
    }
}

const ruleValidateExistsCpf = async (rule: any, value: any, callback: any) => {
    if (!componenteForm.ID_COMPONENTES || componenteForm.ID_COMPONENTES === 0) {
        const componente = await $componenteService.getComponenteByCpf(value)
        if (componente) {
            callback(Error('CPF já cadastrado.'))
        } else {
            callback()
        }
    }
}

const ruleValidateExistsTefa = async (rule: any, value: any, callback: any) => {
    if (!componenteForm.ID_COMPONENTES || componenteForm.ID_COMPONENTES === 0) {
        const componente = await $componenteService.getComponenteByTefa(value)
        if (componente) {
            callback(Error('TEFA já cadastrado.'))
        } else {
            callback()
        }
    }
}

const ruleValidateExistsFullname = async (rule: any, value: any, callback: any) => {
    if (!componenteForm.ID_COMPONENTES || componenteForm.ID_COMPONENTES === 0) {
        const componente = await $componenteService.getComponenteByFullname(value)
        if (componente && componente.length > 0) {
            callback(Error('Componente já cadastrado.'))
        } else {
            callback()
        }
    }
}
// Regras de validação do formulário de usuários
const componenteFormRules = reactive<FormRules<ComponenteForm>>({
    NOME: [
        { required: true, message: 'Nome obrigatório.', trigger: 'blur' },
        { min: 3, max: 50, message: 'Tamanho entre 3 e 20 caracteres.', trigger: 'blur' },
        { required: true, asyncValidator: ruleValidateExistsFullname, trigger: 'blur' }
    ],
    CPF: [
        {
            required: true,
            validator: ruleValidateCpf,
            trigger: 'blur',
        },
        {
            required: true,
            validator: ruleValidateExistsCpf,
            trigger: 'blur',
        },
    ],
    TEFA: [
        {
            required: true,
            validator: ruleValidateTefa,
            trigger: 'blur',
        },
        {
            required: true,
            validator: ruleValidateExistsTefa,
            trigger: 'blur',
        },
    ],
    LOGRADOURO: [
        {
            required: true,
            message: 'Logradouro obrigatório.',
            trigger: 'blur',
        },
    ],
    NUMERO: [
        {
            required: true,
            message: 'Número obrigatório.',
            trigger: 'blur',
        },
    ],
    CEP: [
        {
            required: true,
            validator: ruleValidateCep,
            trigger: 'blur',
        },
    ],
    BAIRRO: [
        {
            required: true,
            message: 'Bairro obrigatório.',
            trigger: 'blur',
        },
    ],
    CIDADE: [
        {
            required: true,
            message: 'Cidade obrigatória.',
            trigger: 'blur',
        },
    ],
    TELEFONE: [
        {
            required: true,
            validator: ruleValidateTelefone,
            trigger: 'blur',
        },
    ],
    EMAIL: [
        {
            required: true,
            validator: ruleValidateEmail,
            trigger: 'blur',
        },
    ],
    DATA_INCLUSAO: [
        {
            type: 'date',
            required: true,
            message: 'Coloque a data de inclusão',
            trigger: 'change',
        },
    ],

})

//Transforma um objeto em um array de funcoes_componentes
const adaptarFuncoesComponentes = (lista: any, inclusao: Date) => {
    const funcoes: any[] = []
    lista.forEach((value: any) => {
        //ID_COMPONENTES: id_usuarios,
        funcoes.push({ ID_FUNCOES: value, DATA_INICIO: inclusao })
    })
    return funcoes
}

const funcoesComponentesToNumberArray = (lista: FuncoesComponentes[]): number[] => {
    return lista.map((row) => {
        return row.ID_FUNCOES
    })
}

// Compara dois arrays e gera duas listas de numeros 
// uma para exclusao e outra para inclusao
// Exclusão contém os ítems que tem em original mas não tem em selecionadas
// Inclusão contém os ítems que tem em selecionadas mas não tem em original
const compararArrays = (original: number[], selecionadas: number[]) => {
    const inclusao: number[] = selecionadas.filter((row, index, array) => {
        return !original.includes(row)
    })
    const exclusao: number[] = original.filter((row, index, array) => {
        return !selecionadas.includes(row)
    })
    return { inclusao, exclusao }
}

watch(estado_form, (newValue, oldValue) => {
    if (newValue === 1) {
        uploadRef.value.disabled = true
        transferRef.value.disabled = true
        label_card_header.value = 'Vazio'
    } else if (newValue === 2) {
        uploadRef.value.disabled = true
        transferRef.value.disabled = true
        label_card_header.value = 'Vizualizando...'
    } else if (newValue === 3) {
        uploadRef.value.disabled = false
        transferRef.value.disabled = false
        if (componenteForm.ID_COMPONENTES && componenteForm.ID_COMPONENTES > 0)
            label_card_header.value = 'Editando...'
        else if (!componenteForm.ID_COMPONENTES || componenteForm.ID_COMPONENTES === 0)
            label_card_header.value = 'Incluindo...'
    }
    uploadRef.value.estado_form = newValue

})

watch(props, async (newValue, oldValue) => {
    estado_form.value = 2
    if (newValue['componente']) {
        componenteForm.ID_COMPONENTES = newValue['componente']['ID_COMPONENTES']
        componenteForm.NOME = newValue['componente']['NOME']
        componenteForm.CPF = newValue['componente']['CPF']
        componenteForm.TEFA = newValue['componente']['TEFA']
        componenteForm.DATA_NASCIMENTO = newValue['componente']['DATA_NASCIMENTO']
        componenteForm.LOGRADOURO = newValue['componente']['LOGRADOURO']
        componenteForm.NUMERO = newValue['componente']['NUMERO']
        componenteForm.CEP = newValue['componente']['CEP']
        componenteForm.BAIRRO = newValue['componente']['BAIRRO']
        componenteForm.TELEFONE = newValue['componente']['TELEFONE']
        componenteForm.EMAIL = newValue['componente']['EMAIL']
        componenteForm.CIDADE = newValue['componente']['CIDADE']
        componenteForm.ESTADO = newValue['componente']['ESTADO']
        componenteForm.DATA_INCLUSAO = newValue['componente']['DATA_INCLUSAO']
        componenteForm.FOTO = newValue['componente']['FOTO']
        componenteForm.ID_BRUDS = newValue['componente']['ID_BRUDS']
        const lista = newValue['componente']['funcoes_componentes'] as []
        componenteForm.funcoes_componentes = lista
        transferRef.value.value = []
        lista.forEach((value: FuncoesComponentes) => {
            transferRef.value.value.push(value.ID_FUNCOES)
        })
        //await loadImageData("/assets/img/componentes/", "05464688706.jpg")
        await loadImageDataOfAWSS3("bandauniaoracional", `imagens/fotoscomponentes/${componenteForm.CPF}.jpg`)
    }
})

onMounted(async () => {
    await loadEstados()
    componenteForm.ESTADO = "AC"
    await loadBruds()
    componenteForm.ID_BRUDS = bruds.value[0]['ID_BRUDS']
    uploadRef.value.disabled = true
    //uploadRef.value.imageData = 'http://localhost:3000/img/componentes/default.jpg'    
    //console.log(await $componenteService.getCep('26052840')) 

});

definePageMeta({
    middleware: 'auth'
});

</script>

<style scoped>
.box-card-dados-componente-cadastro {
    width: 98%;
}

.btn {
    width: 50px;
    height: 50px;
}

.card-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
