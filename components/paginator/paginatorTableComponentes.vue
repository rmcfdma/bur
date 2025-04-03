<template>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[2, 5, 10, 20]"
        :small="small" :disabled="disabled" :background="background" layout="total,sizes, prev, pager, next" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { authStore } from '@/store/auth';
import { tableStore } from '@/store/table';
import { breadcrumbsStore } from '@/store/breadcrumbs';

const {$componenteService} = useNuxtApp()
const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(0)
const store = authStore();
const storeTable = tableStore();
const { setBreadcrumbs } = breadcrumbsStore();


const emit = defineEmits(['paginate']);

// Muda o tamanho da página
const handleSizeChange = async (val: number) => {
    pageSize.value = val;
    storeTable.setSizePage(val)
    emit('paginate', await loadComponentesByPage(currentPage.value, pageSize.value))
}

// Função executada ao efetuar a paginação. Ela recebe o número
// da página solicitada, faz uma requisição ao Banco de dados,
// e envia o resultado para a tabela através de 
// emitirEvento(resultado)
const handleCurrentChange: any = async (val: number) => {
    currentPage.value = val;
    storeTable.setCurrentPage(val)
    emit('paginate', await loadComponentesByPage(currentPage.value, pageSize.value))
}

const loadComponentesByPage = async (page: number, size: number) => {
    try {
        return await $componenteService.getComponentesByPage(page, size);
    } catch (error) {
        store.setAccessToken(null)
        store.setRefreshToken(null)
        setBreadcrumbs([['8', 'login', '/login', 'Página de Login']]);
        navigateTo('/login')
        console.error('Erro ao carregar os componentes: ', error);
    }
};

watch(currentPage, (newValue, oldValue) => {
    storeTable.setCurrentPage(newValue)
})

watch(pageSize, (newValue, oldValue) => {
    storeTable.setSizePage(newValue)
})

watch(storeTable, (newValue, oldValue) => {
    total.value = newValue.getTotal
    currentPage.value = newValue.getCurrentPage
    pageSize.value = newValue.getSizePage
})

onMounted(async () => {
    emit('paginate', await loadComponentesByPage(1, pageSize.value))
    total.value = storeTable.getTotal
});

</script>