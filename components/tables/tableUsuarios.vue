<template>
    <div class="tabela">
        <div class="search-container">
            <el-input :prefix-icon="Search" style="width: 240px" v-model="search" placeholder="Digite o Componente" />
        </div>
        <el-table :header-cell-style="{ textAlign: 'left' }" :row-style="{ textAlign: 'left' }"
            :row-class-name="tableRowClassName" style="width:100%" :data="usuarios" :row-key="getRowKey"
            @row-dblclick="handleRowDblClick" @selection-change="handleSelectionChange"
            empty-text="Nenhum usuário encontrado." @current-change="handleCurrentChange" @sort-change="sortChange"
            :default-sort="{ prop: 'USERNAME', order: 'descending' }">
            <el-table-column  id="selection" width="50" type="selection" :reserve-selection="true" />
            <el-table-column  id="username" width="130" property="USERNAME" label="Usuário" sortable />
            <el-table-column  id="componente" width="270" property="componentes.NOME" label="Componente"
                sortable />
            <el-table-column  id="brud" width="150" property="componentes.bruds.NOME" label="BRUD" sortable />
            <el-table-column id="inclusao" width="100" label="Inclusão">
                <template #default="scope">{{ formatarData(scope.row.DATA_INCLUSAO) }}</template>
            </el-table-column>
            <el-table-column width="80" class="operacoes" label="Operações">
                <template #default="scope">
                    <el-icon @click="multipleSelection.length === 0 ? handleEdit(scope.$index, scope.row) : null"
                        :size="25">
                        <Edit :class="multipleSelection.length > 0 ? 'disabled-icon' : 'enabled-icon'" />
                    </el-icon>
                    <el-icon @click="multipleSelection.length === 0 ? handleDelete(scope.$index, scope.row) : null"
                        :size="25">
                        <Delete :class="multipleSelection.length > 0 ? 'disabled-icon' : 'enabled-icon'" />
                    </el-icon>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer_table">
            <span></span>
            <PaginatorTableUsuarios :usuarios="usuarios" @paginate="handlePaginateEvent" />
            <el-button :disabled="multipleSelection.length === 0" @click="removeTodos" type="primary">Apagar
                Todos</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
//import * as service from '@/services/usuariosService';
import { ElTable, ElNotification } from 'element-plus'
import type { IUsuario } from "~/types/IUsuario";
import { Search, Edit, Delete, EditPen, Plus, Grid, Select, Check, Minus } from '@element-plus/icons-vue'
//import { getComponentesByName } from '~/services/componentesService';
import type { IComponente } from '~/types/IComponente';
//import { getUsuariosByNomeComponentes, getUsuariosCount } from '@/services/usuariosService';
import { tableStore } from '@/store/table';

const {$usuarioService} = useNuxtApp()
const usuarios = ref<IUsuario[]>([])
const total_usuarios_banco = ref(0)
const multipleSelection = ref<IUsuario[]>([])
const currentRow = ref<IUsuario>()
const emit = defineEmits(['linha-clicada', 'show-table']);
const search = ref("")
const storeTable = tableStore();
const order = ref("acending")
const props = defineProps(['visible'])

interface Usuario extends Omit<IUsuario, "componentes"> {
    ID_COMPONENTES: number;
};

interface Componente extends Omit<IComponente, "funcoes_componentes"> {
    usuarios: Usuario[];
}

const sortChange = (data: { column: any, prop: string, order: any }) => {
    order.value = data.order
}

//Carrega o array componentes pelas iniciais do nome
const loadUsuariosByNameComponentes = async (name: string) => {
    try {
        return await $usuarioService.getUsuariosByNomeComponentes(name)
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
        return []

    }
};

//Pega o usuário com um clique em cima de uma determinada linha
const handleCurrentChange = (row: IUsuario | undefined) => {
    // currentRow.value = row
    // emit('linha-clicada', currentRow.value)
}

//Pega o usuário com um duplo clique em cima de uma determinada linha
const handleRowDblClick = (row: IUsuario | undefined, column: any, event: Event) => {
    currentRow.value = row
    emit('linha-clicada', currentRow.value)
    emit('show-table', false)
}

//Altera a classe da linha ao clicar em cima dela
const tableRowClassName = ({ row, rowIndex, }: { row: IUsuario, rowIndex: number }) => {
    if (currentRow.value?.ID_USUARIOS === row.ID_USUARIOS)
        return 'clicked-row'

    const item = multipleSelection.value.find((item) => item.ID_USUARIOS === row.ID_USUARIOS);
    if (item)
        return 'warning-row'
}

const excluirRegistrosPorIds = (array: IUsuario[], idsParaExcluir: number[]) => {
  // Filtra o array para excluir os registros com IDs presentes em 'idsParaExcluir'
  const arrayFiltrado = array.filter(item => !idsParaExcluir.includes(Number(item.ID_USUARIOS)));
  
  // Retorna o novo array após a exclusão
  return arrayFiltrado;
}

const removeTodos = async () => {
    const listaIdsParaExclusao = multipleSelection.value.map((usuario: IUsuario) => usuario.ID_USUARIOS)

    ElMessageBox.confirm(
        `Foram selecionados ${listaIdsParaExclusao.length} usuário(s). Deseja excluir?`,
        'Exclusão de Usuários',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const resposta = await $usuarioService.removeAll(listaIdsParaExclusao as number[])
                console.log("Total excluído" + resposta.data)
                usuarios.value = excluirRegistrosPorIds(usuarios.value, listaIdsParaExclusao as number[] )
                storeTable.setTotal(await $usuarioService.getUsuariosCount() )
                ElMessage({
                    type: 'success',
                    message: `${listaIdsParaExclusao.length} Usuário(s) excluído(s) com sucesso.`,
                })
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível excluir os usuários.',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Exclusão cancelada pelo usuário.',
            })
        })
}

const handleSelectionChange = (val: IUsuario[]) => {
    multipleSelection.value = val
    //console.table(multipleSelection.value)
}

const getRowKey = (row: IUsuario) => {
    return String(row.ID_USUARIOS)
}

const handleEdit = async (index: number, row: IUsuario) => {
    currentRow.value = row
    emit('linha-clicada', currentRow.value)
    emit('show-table', false)
}

const handleDelete = async (index: number, row: IUsuario) => {
    ElMessageBox.confirm(
        'Deseja remover o usuário selecionado?',
        'Exclusão de Usuário',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                await $usuarioService.remove(row.ID_USUARIOS as number);
                usuarios.value.splice(index, 1)
                await loadTotalUsuarios()
                storeTable.setTotal(total_usuarios_banco.value)
                ElMessage({
                    type: 'success',
                    message: 'Usuário removido com sucesso.',
                })
            } catch (error) {
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

const loadUsuariosByPage = async (page: number, size: number) => {
    try {
        usuarios.value = await $usuarioService.getUsuariosByPage(page, size);
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
};

const loadTotalUsuarios = async () => {
    try {
        total_usuarios_banco.value = await $usuarioService.getUsuariosCount();

    } catch (error) {
        total_usuarios_banco.value = 0
        console.error('Erro ao carregar os usuários:', error);
    }
};

const formatarData = (value: string) => {
    const data = new Date(value);
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
};

// Evento emitido pelo componente filho 
// paginate por ocasião da alteração do tamanho da página.
const handlePaginateEvent = (dados: []) => {
    usuarios.value = dados
};

watch(props, async (newValue, oldValue) => {
    if (newValue.visible) {
        await loadTotalUsuarios()
        await loadUsuariosByPage(1, storeTable.getSizePage)
    }
})

watch(search, async (newValue, oldValue) => {
    if (newValue && newValue.trim() !== "") {
        usuarios.value = await loadUsuariosByNameComponentes(newValue)
    }
    else {
        await loadUsuariosByPage(1, storeTable.getSizePage)
    }
})

onMounted(async () => {
    await loadTotalUsuarios()
    await loadUsuariosByPage(1, storeTable.getSizePage)
});

</script>

<style>
.tabela {
    width: 100%;
}

.footer_table {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.delete {
    cursor: pointer;
}

.spacer {
    width: 1px
}

.disabled-icon {
    opacity: 0.5;
    color: #909399;
    cursor: not-allowed;
    margin-right: 5px;
}

.enabled-icon {
    cursor: pointer;
    margin-right: 5px;
    color: #409EFC;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

tr:hover td {
    background-color: #f0f9eb;
    cursor: pointer;
}

.clicked-row {
    background-color: #f0f0f0;
}

.search-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    /* Ajuste conforme necessário */
}
</style>