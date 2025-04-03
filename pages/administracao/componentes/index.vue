<template>
   <PageHeader />
   <div class="conteudo">
      <FormsFormComponentes @show-table="showTable" :componente="componente" class="formulario" />
      <el-dialog v-model="dialogTableVisible" width="800" draggable>
         <template #header>
            <span>Tabela de Componentes</span>
         </template>
         <TablesTableComponentes :visible="dialogTableVisible" @show-table="showTable"
            @linha-clicada="preencherFormulario" class="tabela" />
      </el-dialog>
   </div>
</template>
<script lang="ts" setup>
import type { IComponente } from '~/types/IComponente';


const dialogTableVisible = ref(false)
const componente = ref<IComponente>()

const preencherFormulario = (linhaClicada: IComponente) => {
   console.log(linhaClicada.FOTO)
   componente.value = linhaClicada
};

const showTable = async (show: boolean) => {
   dialogTableVisible.value = show
}

definePageMeta({
   middleware: [
      'auth',
   ]
});
</script>
<style>
.conteudo {
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 50px 0px;
}
</style>