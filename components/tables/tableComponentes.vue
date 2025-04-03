<template>
    <div class="tabela">
        <div class="search-container">
            <el-input :prefix-icon="Search" style="width: 240px" v-model="search" placeholder="Digite o Componente" />
        </div>
        <el-table v-loading="loading" ref="singleTableRef" :header-cell-style="{ textAlign: 'left' }"
            :row-style="{ textAlign: 'left' }" :row-class-name="tableRowClassName" style="width:100%"
            :data="componentes" :row-key="getRowKey" @row-dblclick="handleRowDblClick"
            @selection-change="handleSelectionChange" empty-text="Nenhum componente encontrado."
            @current-change="handleCurrentChange" @sort-change="sortChange"
            :default-sort="{ prop: 'NAME', order: 'descending' }">
            <el-table-column fixed id="selection" width="50" type="selection" :reserve-selection="true" />
            <el-table-column fixed id="nome" width="300" property="NOME" label="Nome" sortable />
            <el-table-column fixed id="tefa" width="70" property="TEFA" label="TEFA" sortable />
            <el-table-column fixed id="brud" width="180" property="bruds.NOME" label="BRUD" sortable />
            <el-table-column id="nascimento" width="100" label="Nascimento">
                <template #default="scope">{{ formatarData(scope.row.DATA_NASCIMENTO) }}</template>
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
            <PaginatorTableComponentes :componentes="componentes" @paginate="handlePaginateEvent" />
            <el-button :disabled="multipleSelection.length === 0" @click="removeTodos" type="primary">Apagar
                Todos</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ElTable, ElNotification } from 'element-plus'
import { Search, Edit, Delete, EditPen, Plus, Grid, Select, Check, Minus } from '@element-plus/icons-vue'
import type { IComponente } from '~/types/IComponente';
import { tableStore } from '@/store/table';
import type { IFuncoesComponentes } from '~/types/IFuncoesComponente';

const { $componenteService } = useNuxtApp()
const componentes = ref<IComponente[]>([])
const total_componentes_banco = ref(0)
const multipleSelection = ref<IComponente[]>([])
const currentRow = ref<IComponente>()
const emit = defineEmits(['linha-clicada', 'show-table']);
const search = ref("")
const storeTable = tableStore();
const order = ref("acending")
const props = defineProps(['visible'])
const loading = ref(true)
const fotos_componentes = 'fotoscomponentes'

// interface Componente extends Omit<IComponente, "bruds" | "funcoes_componentes" | "emprestimos"> {
// };

interface ComponenteForm extends Omit<IComponente, "bruds" | "emprestimos" | "usuarios" | "funcoes_componentes"> {
    funcoes_componentes: FuncoesComponentes[];
}

interface FuncoesComponentes extends Omit<IFuncoesComponentes, "componentes" | "funcoes"> {
};

const sortChange = (data: { column: any, prop: string, order: any }) => {
    order.value = data.order
}

//Carrega o array componentes pelas iniciais do nome
const loadComponentesByName = async (name: string) => {
    try {
        return await $componenteService.getComponentesByName(name)
    } catch (error) {
        console.error('Erro ao carregar os componentes:', error);
        return []

    }
};

//Pega o usuário com um clique em cima de uma determinada linha
const handleCurrentChange = (row: IComponente | undefined) => {
    currentRow.value = row
    // emit('linha-clicada', currentRow.value)
}

//Pega o usuário com um duplo clique em cima de uma determinada linha
const handleRowDblClick = (row: IComponente | undefined, column: any, event: Event) => {
    currentRow.value = row
    emit('linha-clicada', currentRow.value)
    emit('show-table', false)
}

//Altera a classe da linha ao clicar em cima dela
const tableRowClassName = ({ row, rowIndex, }: { row: IComponente, rowIndex: number }) => {
    if (currentRow.value?.ID_COMPONENTES === row.ID_COMPONENTES)
        return 'clicked-row'

    const item = multipleSelection.value.find((item) => item.ID_COMPONENTES === row.ID_COMPONENTES);
    if (item)
        return 'warning-row'
}

const excluirRegistrosPorIds = (array: IComponente[], idsParaExcluir: number[]) => {
    // Filtra o array ref para excluir os registros com IDs presentes em 'idsParaExcluir'
    const arrayFiltrado = array.filter(item => !idsParaExcluir.includes(Number(item.ID_COMPONENTES)));
    // Retorna o novo array após a exclusão
    return arrayFiltrado;
}

const removeTodos = async () => {
    const runtimeConfig = useRuntimeConfig();
    const listaIdsParaExclusao: number[] = []
    const listaJpegsParaExclusao: object[] = []
    multipleSelection.value.map((componente: IComponente) => {
        listaIdsParaExclusao.push(componente.ID_COMPONENTES)
        listaJpegsParaExclusao.push({ Key: `${runtimeConfig.public.FOTOS_COMPONENTES_URL}/${componente.CPF}.jpg` })
    })

    ElMessageBox.confirm(
        `Foram selecionados ${listaIdsParaExclusao.length} componentes(s). Deseja excluir?`,
        'Exclusão de Componentes',
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
                const resposta = await $componenteService.removeAll(listaIdsParaExclusao, listaJpegsParaExclusao)
                if (resposta.resultado === "1") {
                    multipleSelection.value = []
                    componentes.value = excluirRegistrosPorIds(componentes.value, listaIdsParaExclusao as number[])
                    storeTable.setTotal(await $componenteService.getComponentesCount())
                    loading.close()
                    ElMessage({
                        type: 'success',
                        message: `${listaIdsParaExclusao.length} Componentes(s) excluído(s) com sucesso.`,
                    })
                } else {
                    loading.close()
                    ElMessage({
                        type: 'error',
                        message: 'Não foi possível excluir os componentes.',
                    })
                }
            } catch (error) {
                loading.close()
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível excluir os componentes.',
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

const handleSelectionChange = (val: IComponente[]) => {
    multipleSelection.value = val
    //console.table(multipleSelection.value)
}

const getRowKey = (row: IComponente) => {
    return String(row.ID_COMPONENTES)
}

const handleEdit = async (index: number, row: IComponente) => {
    currentRow.value = row
    emit('linha-clicada', currentRow.value)
    emit('show-table', false)
}

const handleDelete = async (index: number, row: ComponenteForm) => {
    ElMessageBox.confirm(
        'Deseja remover o componente selecionado?',
        'Exclusão de Componente',
        {
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                loading.value = true
                await $componenteService.remove(row);
                componentes.value.splice(index, 1)
                if (componentes.value.length === 0) {
                    emit('show-table', false)
                }
                await loadTotalComponentes()
                storeTable.setTotal(total_componentes_banco.value)
                loading.value = false
                ElMessage({
                    type: 'success',
                    message: 'Componente removido com sucesso.',
                })
            } catch (error) {
                //loading.close()
                ElMessage({
                    type: 'error',
                    message: 'Não foi possível remover o Componente.',
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

const loadComponentesByPage = async (page: number, size: number) => {
    try {
        loading.value = true
        componentes.value = await $componenteService.getComponentesByPage(page, size);
        loading.value = false
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
};

const loadTotalComponentes = async () => {
    try {
        total_componentes_banco.value = await $componenteService.getComponentesCount();

    } catch (error) {
        total_componentes_banco.value = 0
        console.error('Erro ao carregar os componentes:', error);
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
    componentes.value = dados
};

watch(props, async (newValue, oldValue) => {
    if (newValue.visible) {
        loading.value = true
        await loadTotalComponentes()
        await loadComponentesByPage(1, storeTable.getSizePage)
        loading.value = false
    }
})

watch(search, async (newValue, oldValue) => {
    if (newValue && newValue.trim() !== "") {
        loading.value = true
        componentes.value = await loadComponentesByName(newValue)
        loading.value = false
    }
    else {
        await loadComponentesByPage(1, storeTable.getSizePage)
    }
})

onMounted(async () => {
    loading.value = true
    await loadTotalComponentes()
    await loadComponentesByPage(1, storeTable.getSizePage)
    loading.value = false
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