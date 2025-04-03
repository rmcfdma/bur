<template>
    <el-transfer @change="changeRight" filterable v-model="value" :data="data" :titles="['Restantes', 'Atribuída']"
        :filter-placeholder="'Coloque a Função'">
    </el-transfer>
</template>
<script lang='ts' setup>

//import { getFuncoes } from '@/services/funcoesService';
import type { TransferDirection, TransferKey } from 'element-plus';
import type { IFuncao } from '~/types/IFuncao';


const {$funcaoService} = useNuxtApp()
const funcoes = ref<IFuncao[]>([]);                // Funcoes existentes
const data = ref<Option[]>()
const value = ref<number[]>([])
const disabled = ref(true)



interface Option {
    key: number
    label: string
    disabled: boolean
}

const generateOptionsFuncoes = (lista: IFuncao[]) => {
    let options: Option[] = []
    //= { key: 0, label: "", disabled: false }
    lista.forEach((element) => {
        options.push({
            key: element.ID_FUNCOES,
            label: element.FUNCAO,
            disabled: false
        })
    });
    return options
}

const changeRight = async (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => {
    if (value.length === 0) {
        const elemento = document.querySelector('.el-transfer-panel__empty');
        if (elemento) {
            elemento.innerHTML = 'Sem Funções'
            console.log(elemento?.innerHTML)
            console.log(document.querySelector('.el-transfer-panel__empty')?.innerHTML)
        }
        if (elemento instanceof HTMLElement) {
            void elemento.offsetWidth;
        }
    }
}

const loadFuncoes = async () => {
    try {
        funcoes.value = await $funcaoService.getFuncoes();
    } catch (error) {
        console.error('Erro ao carregar as funções:', error);
    }
};

watch(disabled, (newValue, oldValue) => {
    if (newValue) {
        data.value?.forEach(linha => { linha.disabled = true })
    } else {
        data.value?.forEach(linha => { linha.disabled = false })
    } 

})

onMounted(async () => {
    await loadFuncoes()
    value.value = []
    data.value = generateOptionsFuncoes(funcoes.value)
    data.value.forEach(linha => { linha.disabled = true })

});

defineExpose({ disabled, value })
</script>

<style scoped>
.el-transfer {
    --el-transfer-panel-width: 300px
}

.el-input__inner {
    font-size: 20px;
}
</style>

<style>
.el-transfer-panel .el-input__inner {
    font-family: 'Times New Roman', sans-serif;
    font-size: 14px;
    padding-left: 3px;
}
</style>