<template>
    <el-card class="box-card-dados-componente ">
        <template #header>
            <div class="card-header">
                <span>Dados do Componente</span>
            </div>
        </template>
        <el-form label-width="100px" label-position="right" class="form-usuarios" status-icon>
            <el-row>
                <el-col :span="8">
                    <el-image style="width: 215px; height: 270px; border-radius: 10px"
                        :src="(componente && componente > 0 && possui_foto) ? `http://localhost:3000/_nuxt/assets/img/componentes/${cpf}.jpg` : `http://localhost:3000/img/componentes/default.jpg`"
                        fit="fill" />
                </el-col>
                <el-col :span="16">
                    <el-row>
                        <el-form-item label="Pesquisa">
                            <!-- <el-switch v-model="pesquisa_por_iniciais" @change="changeSwitchIniciais" /> -->
                            <el-radio-group v-model="pesquisa_por_iniciais" @change="changeRadioPesquisa">
                                <el-radio :label="false">Por BRUD</el-radio>
                                <el-radio :label="true">Por Dados Pessoais.</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Estado" prop="region">
                            <el-select v-model="estado" :disabled="estados?.length === 0"
                                :placeholder="estados?.length > 0 ? 'Escolha o estado' : 'Nenhum estado encontado'"
                                style="width: 280px" @change="estadoChange">
                                <el-option v-for="(item_estado, index_estado) in estados" :key="index_estado"
                                    :label="item_estado['nome']" :value="item_estado['sigla']" />
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="BRUD" prop="region">
                            <el-select v-model="brud" :disabled="bruds?.length === 0" filterable value-key="ID_BRUDS"
                                label-key="BRUD" placeholder="Nunhuma BRUD encontrada" style="width: 280px"
                                @change="brudChange" no-data-text="Sem registros">
                                <el-option v-for="(item_brud, index_brud) in bruds" :key="index_brud"
                                    :label="item_brud['NOME']" :value="item_brud['ID_BRUDS']" />
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Nome" placeholder="Componentes">
                            <el-select v-if="!pesquisa_por_iniciais" v-model="componente"
                                :disabled="componentes?.length === 0" filterable
                                :placeholder="componentes.length > 0 ? 'Selecione o componente' : 'Nenhum componente encontrado'"
                                no-data-text="Sem registros." style="width: 280px" @change="selectNome">
                                <el-option v-for="(item_componente, index_componente) in componentes"
                                    :key="index_componente" :label="item_componente['NOME']"
                                    :value="item_componente['ID_COMPONENTES']" />
                            </el-select>
                            <el-autocomplete :formatter="formatNome" :parser="parseNome" v-else value-key="NOME"
                                v-model="nome" :trigger-on-focus="false" :fetch-suggestions="createSuggestionsName"
                                @select="selectSuggestionNome" clearable style="width: 280px"
                                :placeholder="pesquisa_por_iniciais ? 'Coloque as iniciais.' : 'Nenhum componente encontrado.'">
                                <template #default="{ item }">
                                    <span>{{ item.NOME }}</span>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="CPF" prop="cpf">
                            <el-input v-model="cpf" style="width: 240px" :disabled="cpf === undefined"
                                :readonly="!pesquisa_por_iniciais" placeholder="Coloque o CPF" :formatter="formatCpf"
                                @keyup.enter="localizarPorCpf" :parser="parseCpf" maxlength="14" @input="cpfInput">
                                <template v-if="pesquisa_por_iniciais" #append>
                                    <el-button v-on:click="localizarPorCpf" :icon="Search" />
                                </template>
                            </el-input>
                            <!-- <el-text size="large" class="cpf" type="primary"> {{ cpf }} </el-text> -->
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item class="tefa" label="TEFA" prop="tefa">
                            <el-input v-model="tefa" style="width: 240px" :disabled="tefa === undefined"
                                :readonly="!pesquisa_por_iniciais" placeholder="Coloque a TEFA" :formatter="formatTefa"
                                @keyup.enter="localizarPorTefa" :parser="parseTefa" maxlength="10" @input="tefaInput">
                                <template v-if="pesquisa_por_iniciais" #append>
                                    <el-button v-on:click="localizarPorTefa" :icon="Search" />
                                </template>
                            </el-input>
                            <!-- <el-text size="large" type="primary"> {{ tefa }} </el-text> -->
                        </el-form-item>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
    <br>
    <el-card class="box-card-dados-usuario ">
        <template #header>
            <div class="card-header">
                <span>Dados do Usuário</span>
            </div>
        </template>
        <el-form :disabled="!habilita_form_usuarios" ref="usuarioFormRef" label-width="110px" label-position="right"
            :model="usuarioForm" :rules="usuarioFormRules" class="form-usuarios" status-icon>
            <el-row>
                <el-col :span="13">
                    <el-row>
                        <el-form-item label="Usuário" prop="USERNAME">
                            <el-input :readonly="estado_form !== 4" v-model="usuarioForm.USERNAME"
                                placeholder="Coloque o usuário" @input="inputChangeState" />
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Senha" prop="PASSWORD">
                            <el-input id="password" :disabled="utilizar_senha_padrão || estado_form !== 4"
                                v-model="usuarioForm.PASSWORD" type="password" autocomplete="off"
                                placeholder="Escolha a senha" maxlength="12" @input="inputChangeState" show-password />
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Repita a senha" prop="CHECKPASSWORD">
                            <el-input id="checkpassword" :disabled="utilizar_senha_padrão || estado_form !== 4"
                                v-model="usuarioForm.CHECKPASSWORD" type="password" autocomplete="off"
                                placeholder="Repita a senha" maxlength="12" @input="inputChangeState" show-password />
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item>
                            <el-checkbox :disabled="estado_form !== 4" v-model="utilizar_senha_padrão"
                                label="Senha Padrão" />
                        </el-form-item>
                        <el-form-item>
                            <el-select :disabled="!utilizar_senha_padrão || estado_form !== 4" style="width: 140px"
                                v-model="senha_padrao" placeholder="Select">
                                <el-option v-for="item in senhas_padroes" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-row>
                </el-col>
                <el-col :span="11">
                    <el-row>
                        <el-form-item label="Data Inclusão" prop="DATA_INCLUSAO">
                            <el-config-provider :locale="locale">
                                <el-date-picker :readonly="estado_form !== 4" v-model="usuarioForm.DATA_INCLUSAO"
                                    type="date" label="Data Inclusão" placeholder="Escolha uma data" format="DD/MM/YYYY"
                                    :disabled-date="disabledDate" @change="changeData">
                                </el-date-picker>
                            </el-config-provider>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="Data Exclusão" prop="DATA_EXCLUSAO">
                            <el-config-provider :locale="locale">
                                <el-date-picker :readonly="true" v-model="usuarioForm.DATA_EXCLUSAO" type="date"
                                    label="Data Exclusão" placeholder="Escolha uma data" format="DD/MM/YYYY"
                                    :disabled-date="disabledDate" @change="changeData" />
                            </el-config-provider>
                        </el-form-item>
                    </el-row>
                </el-col>
            </el-row>

            <br>

        </el-form>
        <!-- incluir(usuarioFormRef) -->
        <el-button :disabled="estado_form !== 3" plain type="primary" @click="novo">Novo</el-button>
        <!-- alterar(usuarioFormRef) -->
        <el-button :disabled="estado_form !== 2" plain type="primary" @click="editar">Editar</el-button>
        <el-button :disabled="estado_form !== 4" plain type="primary" @click="salvar(usuarioFormRef)">Salvar</el-button>
        <el-button :disabled="estado_form !== 4" plain type="primary"
            @click="cancelar(usuarioFormRef)">Cancelar</el-button>
        <!-- excluir(usuarioFormRef) -->
        <el-button :disabled="estado_form !== 2" plain type="primary" @click="remover(usuarioForm)">Remover</el-button>
        <!-- resetForm(usuarioFormRef) -->
        <el-button :disabled="estado_form !== 4" plain type="primary" @click="limpar(usuarioFormRef)">Limpar</el-button>
        <el-button :disabled="estado_form === 4" plain type="primary" @click="visualizarTabela">Localizar</el-button>

    </el-card>
    <br>
</template>

<script lang='ts' setup>
import type { FormInstance, FormRules, ElConfigProvider, ElOption, AutocompleteFetchSuggestions } from 'element-plus'
//import { getComponentesByBrud, getComponentesByName, getComponenteById, getComponentes, getComponenteByCpf, getComponenteByTefa } from '@/services/componentesService';
//import { getBruds, getBrudsByEstado } from '@/services/brudsService';
//import { getUsuarioByComponente, include, edit, remove, getUsuariosCount } from '@/services/usuariosService';
//import { getEstados } from '@/services/utilsService';
import type { IUsuario } from '~/types/IUsuario';
import { Search, Edit, Delete, EditPen, Plus, Grid, Select, Check, Minus } from '@element-plus/icons-vue'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import ptBr from 'element-plus/dist/locale/pt-br.mjs';
import type { IComponente } from '~/types/IComponente';
import { tableStore } from '~/store/table';


const pesquisa_por_iniciais = ref(false)
const habilita_form_usuarios = ref(false)
const possui_foto = ref<boolean | undefined>(true)
const nome = ref("")
const estados = ref([])                                 // Estados do Brasil
const estado = ref<string | undefined>("AC")            // Estado atual
const bruds = ref([]);                                  // Lista de bruds
const brud = ref(undefined as number | undefined)       // Brud atual
const componentes = ref([]);                            // Lista de componentes
let componente = ref(undefined as number | undefined)  // Componente atual
const props = defineProps(['usuario', 'muda_estado_form']) // Define que usuario será recebida de seu componente pai
const usuarioFormRef = ref<FormInstance>()  // Instancia reativa do el-form
const locale = ptBr
const cpf = ref<string | undefined>("")
const tefa = ref<string | undefined>("")
const { formatCpf, parseCpf, validateCpf, formatTefa, parseTefa, formatNome, parseNome } = useComponente()
const emit = defineEmits(['show-table']);


const {$componenteService, $brudService, $utilService, $usuarioService} = useNuxtApp()
// 1 - localizando componente (Sem componente - [Localizar]) | 2 - Mostrando usuário (Visualizando) - [Editar, Remover, Localizar] | 3 - Mostrando Form Usuário Vazio (Com Componente mas sem Usuário) - [Novo, localizar] | 4 - Preenchendo Form usuários (Editando ou Incluindo) - [Salvar, Cancelar, Limpar]
const estado_form = ref(1)
const storeTable = tableStore();
const utilizar_senha_padrão = ref(true)
const senha_padrao = ref("cpf")

// Interface que representa o formulário de componentes
// extendida de IUsuario com o campo extra checkpassword 
// e ID_COMPONENTES
interface UsuarioForm extends Omit<IUsuario, "componentes"> {
    CHECKPASSWORD: string;
};

interface Usuario extends IUsuario {
};

interface Componente extends Omit<IComponente, "bruds" | "funcoes_componentes" | "emprestimos"> {

};

// interface Componente extends Omit<IComponente, "funcoes_componentes"> {
//     usuarios: Usuario[];
// };

const senhas_padroes = [
    {
        value: 'cpf',
        label: 'CPF',
    },
    {
        value: 'tefa',
        label: 'TEFA',
    }
]

const fotoExists = (id_componente: number) => {
    const url = `http://localhost:3000/img/componentes/${id_componente}.jpg`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                possui_foto.value = true
            } else {
                possui_foto.value = false
            }
        })
        .catch((error) => {
            console.log("A url da foto não existe.")
            possui_foto.value = undefined
        });

}

const inputChangeState = (value: string) => {
    if (estado_form.value === 2)
        estado_form.value = 4
}

const changeData = (value: string) => {
    if (estado_form.value === 2)
        estado_form.value = 4
}

// Instancia um objeto usuário reativo com dados iniciais 
let usuarioForm = reactive<UsuarioForm>({
    ID_USUARIOS: 0,
    USERNAME: '',
    PASSWORD: '',
    CHECKPASSWORD: '',
    DATA_INCLUSAO: new Date(),
    DATA_EXCLUSAO: new Date(),
    ID_COMPONENTES: 0
})

const resetUsuarioForm = () => {
    usuarioForm.ID_USUARIOS = 0;
    usuarioForm.USERNAME = '';
    usuarioForm.DATA_INCLUSAO = undefined;
    usuarioForm.DATA_EXCLUSAO = undefined;
    usuarioForm.ID_COMPONENTES = 0;
    //colocarSenhaPadrao()
}

const novo = () => {
    usuarioForm.ID_USUARIOS = 0;
    usuarioForm.USERNAME = '';
    usuarioForm.DATA_INCLUSAO = undefined;
    usuarioForm.DATA_EXCLUSAO = undefined;
    //colocarSenhaPadrao()
    estado_form.value = 4
    habilita_form_usuarios.value = true
}

const editar = () => {
    estado_form.value = 4
    habilita_form_usuarios.value = true
}

const salvar = (formEl: FormInstance | undefined) => {
    const est = estado_form.value
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const usuario: Usuario = {
                ID_USUARIOS: usuarioForm.ID_USUARIOS,
                USERNAME: usuarioForm.USERNAME,
                PASSWORD: usuarioForm.PASSWORD,
                DATA_INCLUSAO: usuarioForm.DATA_INCLUSAO,
                DATA_EXCLUSAO: usuarioForm.DATA_EXCLUSAO,
                ID_COMPONENTES: componente.value as number
            }

            if (usuarioForm.ID_USUARIOS === 0) {
                const comp = await salvar_inclusao(usuario)
                usuarioForm.ID_USUARIOS = comp.ID_USUARIOS
            }
            else {
                salvar_edicao(usuario)
            }
        }
    })
}

const salvar_inclusao = async (usuario: Usuario) => {
    if (usuario.ID_COMPONENTES && usuario.ID_COMPONENTES > 0) {
        if (usuario.USERNAME && usuario.USERNAME !== '') {
            if (usuario.DATA_INCLUSAO) {
                try {
                    const comp: any = await $usuarioService.include(usuario);
                    // Atualiza os componentes
                    await loadComponentesByBrud(brud.value as number)
                    ElMessage.success('Usuário incluído com sucesso.')
                    estado_form.value = 2
                    habilita_form_usuarios.value = true
                    return comp
                } catch (error) {
                    estado_form.value = 3
                    habilita_form_usuarios.value = false
                    ElMessage.error('Não foi possível incluir o usuário.')
                    return undefined
                }
            } else {
                ElMessage.error('Selecione a data de inclusão do usuário.')
            }
        } else {
            ElMessage.error('Coloque o nome do usuário.')
        }
    } else {
        ElMessage.error('Selecione o componente.')
    }
};

const salvar_edicao = async (usuario: Usuario) => {
    if (usuario.ID_USUARIOS && usuario.ID_USUARIOS > 0) {
        if (usuario.ID_COMPONENTES && usuario.ID_COMPONENTES > 0) {
            if (usuario.USERNAME && usuario.USERNAME !== '') {
                if (usuario.DATA_INCLUSAO) {
                    try {
                        const comp: any = await $usuarioService.edit(usuario);
                        await loadComponentesByBrud(brud.value as number)
                        ElMessage.success('Usuário alterado com sucesso.')
                        estado_form.value = 2
                        habilita_form_usuarios.value = true
                        return comp
                    } catch (error) {
                        estado_form.value = 2
                        habilita_form_usuarios.value = true
                        ElMessage.error('Não foi possível alterar o usuário.')
                        return undefined
                    }
                }
                else { ElMessage.error('Escolha a data de inclusão.') }
            } else { ElMessage.error('Preencha o nome do usuário.') }
        } else { ElMessage.error('O Id do usuário não retornou para a página.') }
    }
};

const remover = async (usuario: Usuario) => {
    if (usuario.ID_USUARIOS && usuario.ID_USUARIOS > 0) {
        if (usuario.USERNAME && usuario.USERNAME.trim() !== "") {
            handleDelete(usuario)
        } else {
            ElMessage.error('Não é possível excluir um usuário sem o username.')
        }
    } else {
        ElMessage.error('O componente não possui um usuário cadastrado.')
    }
}

const handleDelete = async (usuario: Usuario) => {
    ElMessageBox.confirm(
        'Deseja excluir o usuário selecionado?',
        'Exclusão de Usuário',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const user: any = await $usuarioService.remove(usuario.ID_USUARIOS as number);
                await loadComponentesByBrud(brud.value as number)
                usuarioForm.ID_USUARIOS = 0;
                usuarioForm.USERNAME = "";
                usuarioForm.PASSWORD = "";
                usuarioForm.CHECKPASSWORD = "";
                usuarioForm.DATA_INCLUSAO = undefined;
                usuarioForm.DATA_EXCLUSAO = undefined;
                //colocarSenhaPadrao()
                estado_form.value = 3
                habilita_form_usuarios.value = false
                ElMessage({
                    type: 'success',
                    message: 'Usuário removido com sucesso.',
                })
            } catch (error) {
                estado_form.value = 2
                habilita_form_usuarios.value = true
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível remover o usuário.',
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

const limpar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.clearValidate()
    usuarioForm.USERNAME = ""
    usuarioForm.DATA_INCLUSAO = undefined
    usuarioForm.DATA_EXCLUSAO = undefined
    estado_form.value = 4
    colocarSenhaPadrao()
}

const visualizarTabela = async () => {
    const total = await $usuarioService.getUsuariosCount()
    if (total && total > 0) {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        componentes.value = []
        componente.value = undefined
        nome.value = ""
        cpf.value = ""
        tefa.value = ""
        storeTable.setTotal(total)
        resetUsuarioForm()
        habilita_form_usuarios.value = false
        estado_form.value = 1
        emit('show-table', true)
    } else {
        ElMessage({
            message: 'Não há usuários a serem mostrados.',
            type: 'error',
        })
    }

}

const cancelar = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.clearValidate()
    const comp = await $componenteService.getComponenteById(componente.value as number)
    if (comp?.data.usuarios[0] && comp?.data.usuarios[0].ID_USUARIOS > 0) {
        usuarioForm.ID_USUARIOS = comp?.data.usuarios[0].ID_USUARIOS
        usuarioForm.USERNAME = comp?.data.usuarios[0].USERNAME
        usuarioForm.DATA_INCLUSAO = comp?.data.usuarios[0].DATA_INCLUSAO
        usuarioForm.DATA_EXCLUSAO = comp?.data.usuarios[0].DATA_EXCLUSAO
        usuarioForm.ID_COMPONENTES = comp?.data.usuarios[0].ID_COMPONENTES
        estado_form.value = 2
    } else {
        usuarioForm.ID_USUARIOS = 0
        usuarioForm.USERNAME = ""
        usuarioForm.DATA_INCLUSAO = undefined
        usuarioForm.DATA_EXCLUSAO = undefined
        usuarioForm.ID_COMPONENTES = 0
        estado_form.value = 3
    }
}

const resetComponenteForm = () => {
    estados.value = []
    estado.value = ""
    bruds.value = []
    brud.value = undefined
    componentes.value = []
    componente.value = undefined
    cpf.value = undefined
    tefa.value = undefined
}

const createSuggestionsName = async (queryString: string, cb: any): Promise<Componente[]> => {
    estados.value = []
    estado.value = ""
    bruds.value = []
    brud.value = undefined
    componentes.value = []
    componente.value = undefined
    cpf.value = ""
    tefa.value = ""
    resetUsuarioForm()
    habilita_form_usuarios.value = false
    estado_form.value = 1
    if (queryString && queryString.trim() !== "") {
        await loadComponentesByName(queryString)
        cb(componentes.value)
    } else {
        cb([])
    }
    return componentes.value
}

const selectSuggestionNome = async (item: Record<string, any>) => {
    const comp = await $componenteService.getComponenteById(item.ID_COMPONENTES)
    if (comp?.data) {
        await loadEstados()
        estado.value = comp?.data.bruds.ESTADO
        await loadBrudsByEstado(comp?.data.bruds.ESTADO)
        brud.value = comp?.data.ID_BRUDS
        cpf.value = comp?.data.CPF
        tefa.value = comp?.data.TEFA
        componente.value = comp?.data.ID_COMPONENTES
        if (comp?.data.usuarios[0] && comp?.data.usuarios[0].ID_USUARIOS > 0) {
            usuarioForm.ID_USUARIOS = comp?.data.usuarios[0].ID_USUARIOS
            usuarioForm.USERNAME = comp?.data.usuarios[0].USERNAME
            usuarioForm.DATA_INCLUSAO = comp?.data.usuarios[0].DATA_INCLUSAO
            usuarioForm.DATA_EXCLUSAO = comp?.data.usuarios[0].DATA_EXCLUSAO
            usuarioForm.ID_COMPONENTES = comp?.data.ID_COMPONENTES
            //colocarSenhaPadrao()
            estado_form.value = 2
            habilita_form_usuarios.value = true
        }
        else {
            usuarioForm.ID_USUARIOS = 0;
            usuarioForm.USERNAME = '';
            usuarioForm.PASSWORD = '';
            usuarioForm.CHECKPASSWORD = '';
            usuarioForm.DATA_INCLUSAO = undefined;
            usuarioForm.DATA_EXCLUSAO = undefined;
            usuarioForm.ID_COMPONENTES = 0;
            estado_form.value = 3
            habilita_form_usuarios.value = false

        }
    }
}

const estadoChange = async (sigla: string) => {
    await loadBrudsByEstado(sigla)
    if (bruds.value.length > 0) {
        brud.value = bruds.value[0]['ID_BRUDS']
        await loadComponentesByBrud(brud.value)
        componente.value = componentes.value[0]['ID_COMPONENTES']
        cpf.value = componentes.value[0]['CPF']
        tefa.value = componentes.value[0]['TEFA']
        //await loadUsuarioByComponente(componentes.value[0]['ID_COMPONENTES'])
        if (componentes.value[0]['usuarios'][0] && componentes.value[0]['usuarios'][0]['ID_USUARIOS'] > 0) {
            usuarioForm.ID_USUARIOS = componentes.value[0]['usuarios'][0]['ID_USUARIOS']
            usuarioForm.USERNAME = componentes.value[0]['usuarios'][0]['USERNAME']
            usuarioForm.DATA_INCLUSAO = componentes.value[0]['usuarios'][0]['DATA_INCLUSAO']
            usuarioForm.DATA_EXCLUSAO = componentes.value[0]['usuarios'][0]['DATA_EXCLUSAO']
            usuarioForm.ID_COMPONENTES = componentes.value[0]['ID_COMPONENTES']
            //colocarSenhaPadrao()
            estado_form.value = 2
            habilita_form_usuarios.value = true
        }
        else {
            resetUsuarioForm()
            estado_form.value = 3
            habilita_form_usuarios.value = false
        }
    } else {
        bruds.value = []
        brud.value = undefined
        componente.value = undefined
        componentes.value = []
        cpf.value = undefined
        tefa.value = undefined
        habilita_form_usuarios.value = false
        resetUsuarioForm()
        estado_form.value = 1
    }
    pesquisa_por_iniciais.value = false
}

const brudChange = async (valor: number) => {
    pesquisa_por_iniciais.value = false
    await loadComponentesByBrud(valor)
    if (componentes.value.length > 0) {
        componente.value = componentes.value[0]['ID_COMPONENTES']
        cpf.value = componentes.value[0]['CPF']
        tefa.value = componentes.value[0]['TEFA']
        //await loadUsuarioByComponente(componentes.value[0]['ID_COMPONENTES'])
        if (componentes.value[0]['usuarios'][0] && componentes.value[0]['usuarios'][0]['ID_USUARIOS'] > 0) {
            usuarioForm.ID_USUARIOS = componentes.value[0]['usuarios'][0]['ID_USUARIOS']
            usuarioForm.USERNAME = componentes.value[0]['usuarios'][0]['USERNAME']
            usuarioForm.DATA_INCLUSAO = componentes.value[0]['usuarios'][0]['DATA_INCLUSAO']
            usuarioForm.DATA_EXCLUSAO = componentes.value[0]['usuarios'][0]['DATA_EXCLUSAO']
            usuarioForm.ID_COMPONENTES = componentes.value[0]['ID_COMPONENTES']
            //colocarSenhaPadrao()
            estado_form.value = 2
            habilita_form_usuarios.value = true
        }
        else {
            resetUsuarioForm()
            estado_form.value = 3
            habilita_form_usuarios.value = false
        }

    }
    else {
        componente.value = undefined
        cpf.value = undefined
        tefa.value = undefined
        resetUsuarioForm()
        estado_form.value = 1
        habilita_form_usuarios.value = false

    }
}

// Função que é executada ao mudar o conteúdo do combobox nome
const selectNome = async (id_componente: number) => {
    await loadUsuarioByComponente(id_componente)
    componente.value = id_componente
    componentes.value.forEach((row) => {
        if (row['ID_COMPONENTES'] === id_componente) {
            cpf.value = row['CPF']
            tefa.value = row['TEFA']
            if (row['usuarios'][0] && row['usuarios'][0]['ID_USUARIOS'] > 0) {
                //colocarSenhaPadrao()
                estado_form.value = 2
                habilita_form_usuarios.value = true
            } else {
                estado_form.value = 3
                habilita_form_usuarios.value = false
            }
        }
    })
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


// Função executada ao mudar o radiobox
const changeRadioPesquisa = async () => {
    if (!pesquisa_por_iniciais.value) {
        await loadEstados()
        await loadBrudsByEstado('AC')
        estado.value = "AC"
        brud.value = bruds.value[0]['ID_BRUDS']
        if (bruds.value.length > 0) {
            await loadComponentesByBrud(brud.value)
            componente.value = componentes.value[0]['ID_COMPONENTES']
            cpf.value = componentes.value[0]['CPF']
            tefa.value = componentes.value[0]['TEFA']
            await loadUsuarioByComponente(componentes.value[0]['ID_COMPONENTES'])
            if (usuarioForm.ID_USUARIOS && usuarioForm.ID_USUARIOS > 0) {
                estado_form.value = 2
                habilita_form_usuarios.value = true
            }
            else {
                estado_form.value = 3 // 1 - localizando componente (Sem componente) | 2 - Mostrando usuário (Visualizando) | 3 - Mostrando Form Usuário Vazio (Com Componente mas sem Usuário) | 4 - Preenchendo Form usuários (Editando ou Incluindo)
                habilita_form_usuarios.value = false
            }
        }
        else {
            bruds.value = []
            brud.value = undefined
            componentes.value = []
            componente.value = undefined
            cpf.value = undefined
            tefa.value = undefined
            estado_form.value = 1 // 1 - localizando componente (Sem componente) | 2 - Mostrando usuário (Visualizando) | 3 - Mostrando Form Usuário Vazio (Com Componente mas sem Usuário) | 4 - Preenchendo Form usuários (Editando ou Incluindo)
            habilita_form_usuarios.value = false
            //resetUsuarioForm()
        }
    } else {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        componentes.value = []
        componente.value = undefined
        nome.value = ""
        cpf.value = ""
        tefa.value = ""
        estado_form.value = 1 // 1 - localizando componente (Sem componente) | 2 - Mostrando usuário (Visualizando) | 3 - Mostrando Form Usuário Vazio (Com Componente mas sem Usuário) | 4 - Preenchendo Form usuários (Editando ou Incluindo)
        habilita_form_usuarios.value = false
        resetUsuarioForm()
    }
}

// Função que limpa os formulários sempre que o cpf seja modificado.
const cpfInput = (value: string) => {
    if (pesquisa_por_iniciais.value) {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        componentes.value = []
        componente.value = undefined
        nome.value = ""
        tefa.value = ""
        estado_form.value = 1
        habilita_form_usuarios.value = false
        resetUsuarioForm()
    }
}

// Função que limpa os formulários sempre que a tefa seja modificada.
const tefaInput = (value: string) => {
    if (pesquisa_por_iniciais.value) {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        componentes.value = []
        componente.value = undefined
        nome.value = ""
        cpf.value = ""
        resetUsuarioForm()
        console.log(value)
    }

}

const localizarPorCpf = async () => {
    if (cpf.value && cpf.value.trim() !== "") {
        if (validateCpf(cpf.value)) {
            const comp = await loadComponenteByCpf(cpf.value)
            if (comp) {
                if (estados.value.length === 0)
                    await loadEstados()
                estado.value = comp.bruds.ESTADO
                await loadBrudsByEstado(comp.bruds.ESTADO)
                brud.value = comp.bruds.ID_BRUDS
                await loadComponentesByBrud(comp.bruds.ID_BRUDS)
                componente.value = comp.ID_COMPONENTES
                tefa.value = comp.TEFA
                nome.value = comp.NOME
                if (comp.usuarios[0] && comp.usuarios[0].ID_USUARIOS > 0) {
                    usuarioForm.ID_USUARIOS = comp.usuarios[0].ID_USUARIOS
                    usuarioForm.USERNAME = comp.usuarios[0].USERNAME
                    usuarioForm.DATA_INCLUSAO = comp.usuarios[0].DATA_INCLUSAO
                    usuarioForm.DATA_EXCLUSAO = comp.usuarios[0].DATA_EXCLUSAO
                    usuarioForm.ID_COMPONENTES = comp.ID_COMPONENTES
                    //colocarSenhaPadrao()
                    estado_form.value = 2
                    habilita_form_usuarios.value = true
                } else {
                    resetUsuarioForm()
                    estado_form.value = 3
                    habilita_form_usuarios.value = false
                }
            }
            else {
                estados.value = []
                estado.value = ""
                bruds.value = []
                brud.value = undefined
                nome.value = ""
                tefa.value = ""
                componente.value = undefined
                resetUsuarioForm()
                estado_form.value = 1
                habilita_form_usuarios.value = false
                ElMessage.error('Nenhum componente encontrado com este CPF.')
            }
        } else {
            estados.value = []
            estado.value = ""
            bruds.value = []
            brud.value = undefined
            nome.value = ""
            tefa.value = ""
            componente.value = undefined
            resetUsuarioForm()
            estado_form.value = 1
            habilita_form_usuarios.value = false
            ElMessage.error('CPF Inválido.')
        }
    }
    else {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        nome.value = ""
        tefa.value = ""
        componente.value = undefined
        resetUsuarioForm()
        estado_form.value = 1
        habilita_form_usuarios.value = false
        ElMessage.error('Coloque o CPF.')
    }
}

const localizarPorTefa = async () => {
    if (tefa.value && tefa.value.trim() !== "") {
        const comp = await loadComponenteByTefa(tefa.value)
        if (comp) {
            if (estados.value.length === 0)
                await loadEstados()
            estado.value = comp.bruds.ESTADO
            await loadBrudsByEstado(comp.bruds.ESTADO)
            brud.value = comp.bruds.ID_BRUDS
            await loadComponentesByBrud(comp.bruds.ID_BRUDS)
            componente.value = comp.ID_COMPONENTES
            cpf.value = comp.CPF
            nome.value = comp.NOME
            if (comp.usuarios[0] && comp.usuarios[0].ID_USUARIOS > 0) {
                usuarioForm.ID_USUARIOS = comp.usuarios[0].ID_USUARIOS
                usuarioForm.USERNAME = comp.usuarios[0].USERNAME
                usuarioForm.DATA_INCLUSAO = comp.usuarios[0].DATA_INCLUSAO
                usuarioForm.DATA_EXCLUSAO = comp.usuarios[0].DATA_EXCLUSAO
                usuarioForm.ID_COMPONENTES = comp.ID_COMPONENTES
                //colocarSenhaPadrao()
                estado_form.value = 2
                habilita_form_usuarios.value = true
            } else {
                // estados.value = []
                // estado.value = ""
                // bruds.value = []
                // brud.value = undefined
                //nome.value = ""
                //cpf.value = ""
                //componente.value = undefined
                estado_form.value = 3
                habilita_form_usuarios.value = false
                resetUsuarioForm()
            }
        }
        else {
            estados.value = []
            estado.value = ""
            bruds.value = []
            brud.value = undefined
            nome.value = ""
            cpf.value = ""
            componente.value = undefined
            resetUsuarioForm()
            estado_form.value = 1
            habilita_form_usuarios.value = false
            ElMessage.error('Nenhum componente encontrado com esta TEFA.')
        }
    } else {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        nome.value = ""
        cpf.value = ""
        componente.value = undefined
        estado_form.value = 1
        habilita_form_usuarios.value = false
        resetUsuarioForm()
        ElMessage.error('Coloque a TEFA.')
    }
}

// Carrega o array bruds através de um determinado estado
const loadBrudsByEstado = async (sigla: string) => {
    try {
        bruds.value = await $brudService.getBrudsByEstado(sigla);
    } catch (error) {
        console.error('Erro ao carregar as funções:', error);
    }
};

//Carrega o array componentes de uma determinada BRUD
const loadComponentesByBrud = async (brud: number) => {
    try {
        componentes.value = await $componenteService.getComponentesByBrud(brud);
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
    }
};

//Carrega o array componentes pelas iniciais do nome
const loadComponentesByName = async (name: string) => {
    try {
        componentes.value = await $componenteService.getComponentesByName(name);
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
    }
};

//Carrega um determinado componentes pelo seu id
const loadComponenteById = async (id: number) => {
    try {
        const comp = await $componenteService.getComponenteById(id);
        return comp
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
        return undefined
    }
};

const loadComponenteByCpf = async (cpf: string) => {
    try {
        const comp = await $componenteService.getComponenteByCpf(cpf);
        return comp
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
        return undefined
    }
};

const loadComponenteByTefa = async (tefa: string) => {
    try {
        const comp = await $componenteService.getComponenteByTefa(tefa);
        return comp
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
        return undefined
    }
};

//Carrega o usuário referente a um determinado componente
const loadUsuarioByComponente = async (id_componente: number) => {
    try {
        const user = await $usuarioService.getUsuarioByComponente(id_componente);
        if (user) {
            usuarioForm.ID_USUARIOS = user['ID_USUARIOS']
            usuarioForm.USERNAME = user['USERNAME']
            usuarioForm.PASSWORD = ""
            usuarioForm.CHECKPASSWORD = ""
            usuarioForm.DATA_INCLUSAO = user['DATA_INCLUSAO']
            usuarioForm.DATA_EXCLUSAO = user['DATA_EXCLUSAO']
        }
        else {
            usuarioForm.ID_USUARIOS = undefined
            usuarioForm.USERNAME = ""
            usuarioForm.PASSWORD = ""
            usuarioForm.CHECKPASSWORD = ""
            usuarioForm.DATA_INCLUSAO = undefined
            usuarioForm.DATA_EXCLUSAO = undefined
        }
    } catch (error) {
        console.error('Erro ao carregar o usuário:', error);
    }
};

// Valida o campo de senha
const validatePassword = (rule: any, value: any, callback: any) => {
    if (!utilizar_senha_padrão.value) {
        const re = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$");
        if (value === '') {
            callback(new Error('Entre com a senha.'))
        } else if (!re.test(value)) {
            callback(new Error("Deve conter [a-A] [0-9] [*.!@$%^&']"))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

// Valida o campo de confirmação de senha 
const validateCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Entre com a senha.'))
    } else if (usuarioForm.PASSWORD !== value) {
        callback(new Error('Repita a senha anterior.'))
    } else {
        callback()
    }
}

// Regras de validação do formulário de usuários
const usuarioFormRules = reactive<FormRules<UsuarioForm>>({
    USERNAME: [
        { required: true, message: 'Usuário obrigatório.', trigger: 'blur' },
        { min: 3, max: 20, message: 'Tamanho entre 3 e 20 caracteres.', trigger: 'blur' },
    ],
    PASSWORD: [
        {
            required: true,
            validator: validatePassword,
            trigger: 'blur',
        },
    ],
    CHECKPASSWORD: [
        {
            required: true,
            validator: validateCheckPassword,
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
    DATA_EXCLUSAO: [
        {
            type: 'date',
            required: false,
            message: 'Coloque a data de exclusão',
            trigger: 'change',
        },
    ],

})

const enviarEmail = () => { }

// Carrega dados sempre que o componente for montado
onMounted(async () => {
    if (!pesquisa_por_iniciais.value) {
        await loadEstados()
        await loadBrudsByEstado('AC')
        if (bruds.value.length > 0) {
            brud.value = bruds.value[0]['ID_BRUDS']
            await loadComponentesByBrud(brud.value)
            componente.value = componentes.value[0]['ID_COMPONENTES']
            cpf.value = componentes.value[0]['CPF']
            tefa.value = componentes.value[0]['TEFA']
            await loadUsuarioByComponente(componentes.value[0]['ID_COMPONENTES'])
            usuarioForm.PASSWORD = componentes.value[0]['CPF']
            usuarioForm.CHECKPASSWORD = componentes.value[0]['CPF']
        }
        else {
            bruds.value = []
            brud.value = undefined
            componentes.value = []
            componente.value = undefined
            cpf.value = undefined
            tefa.value = undefined
            resetUsuarioForm()
        }
    } else {
        resetComponenteForm()
    }
});

const colocarSenhaPadrao = () => {
    if (utilizar_senha_padrão.value) {
        if (senha_padrao.value === "cpf") {
            usuarioForm.PASSWORD = cpf.value as string
            usuarioForm.CHECKPASSWORD = cpf.value as string
        } else if (senha_padrao.value === "tefa") {
            usuarioForm.PASSWORD = tefa.value as string
            usuarioForm.CHECKPASSWORD = tefa.value as string
        }
    } else {
        usuarioForm.PASSWORD = ""
        usuarioForm.CHECKPASSWORD = ""
    }
}

// Executa o watch sempre que props mudar 
watch(props, async (newValue, oldValue) => {
    if (newValue['usuario']) {
        pesquisa_por_iniciais.value = false
        await loadEstados()
        estado.value = newValue['usuario'].componentes.bruds.ESTADO
        await loadBrudsByEstado(newValue['usuario'].componentes.bruds.ESTADO)
        brud.value = newValue['usuario'].componentes.bruds.ID_BRUDS
        await loadComponentesByBrud(newValue['usuario'].componentes.bruds.ID_BRUDS)
        componente.value = newValue['usuario'].componentes.ID_COMPONENTES
        await loadUsuarioByComponente(componente.value as number)
        cpf.value = newValue['usuario'].componentes.CPF
        tefa.value = newValue['usuario'].componentes.TEFA
        //colocarSenhaPadrao()
        estado_form.value = 2
        habilita_form_usuarios.value = true
    }
});

//Observa a variável componente 
watch(componente, async (newValue, oldValue) => {
    fotoExists(newValue as number)
})

//Observa a variável componente 
watch(nome, async (newValue, oldValue) => {
    if (!newValue || newValue.trim() === "") {
        estados.value = []
        estado.value = ""
        bruds.value = []
        brud.value = undefined
        componentes.value = []
        componente.value = undefined
        cpf.value = ""
        tefa.value = ""
        resetUsuarioForm()
        habilita_form_usuarios.value = false
        estado_form.value = 1
    }
})

watch(usuarioForm, (newValue, oldValue) => {
    if (newValue['ID_USUARIOS'] && newValue['ID_USUARIOS'] > 0 && componente.value && componente.value > 0) {
        if (estado_form.value === 1) {
            estado_form.value = 2
            habilita_form_usuarios.value = true
        }
    }
})

watch(utilizar_senha_padrão, (newValue, oldValue) => {
    if (newValue) {
        if (senha_padrao.value === "cpf") {
            usuarioForm.PASSWORD = cpf.value as string
            usuarioForm.CHECKPASSWORD = cpf.value as string
        } else if (senha_padrao.value === "tefa") {
            usuarioForm.PASSWORD = tefa.value as string
            usuarioForm.CHECKPASSWORD = tefa.value as string
        }
    } else {
        usuarioForm.PASSWORD = ""
        usuarioForm.CHECKPASSWORD = ""
    }
})

watch(senha_padrao, (newValue, oldValue) => {
    if (newValue === "cpf") {
        usuarioForm.PASSWORD = cpf.value as string
        usuarioForm.CHECKPASSWORD = cpf.value as string
    } else if (newValue === "tefa") {
        usuarioForm.PASSWORD = tefa.value as string
        usuarioForm.CHECKPASSWORD = tefa.value as string
    }
})

watch(estado_form, (newValue, oldValue) => {
    if (newValue === 1) {
        usuarioForm.USERNAME = ""
        usuarioForm.PASSWORD = ""
    } else if (newValue === 2) {
        usuarioForm.PASSWORD = ""
        usuarioForm.CHECKPASSWORD = ""
    } else if (newValue === 3) {
        usuarioForm.PASSWORD = ""
        usuarioForm.CHECKPASSWORD = ""
    } else if (newValue === 4) {
        colocarSenhaPadrao()
    }


})

//Desabilita todas as datas depois da data atual
const disabledDate = (date: Date) => {
    const hoje = new Date();
    return date > hoje;
}

</script>

<style>
.form-usuarios {
    width: 100%;
}

.box-card-dados-usuario {
    width: 90%;
}

.box-card-dados-componente {
    width: 90%;
}

.box-card-funcoes-componente {
    width: 100%;
}

.cpf.tefa {
    font-size: 30px;
}

.icon-container {
    display: inline-block;
}

.icon {
    font-size: 60px;
    /* tamanho normal */
    color: #a0cfff;
    /* cor normal */
    cursor: pointer;
    margin-right: 10px;
    transition: transform 0.3s;
    /* suaviza a transição */
}

.icon_disabled {
    font-size: 60px;
    /* tamanho normal */
    color: #A8ABB2;
    /* cor normal */
    margin-right: 10px;
    transition: transform 0.3s;
    /* suaviza a transição */
}

.icon:hover {
    transform: scale(1.3);
    /* aumenta o tamanho ao passar o mouse */
    color: #79bbff;
    /* cor ao passar o mouse */
}

.disabled {
    background-color: #e0e0e0;
    /* Grayed-out background */
    opacity: 0.6;
    /* Reduced opacity */
    cursor: not-allowed;
    /* "Not-allowed" cursor */
}
</style>