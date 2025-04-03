<template>
  <PageHeader />
  <div class="conteudo">
    <FormsFormUsuarios @show-table="showTable" :usuario="usuario" class="formulario" />
    <el-dialog v-model="dialogTableVisible" width="820" draggable>
      <template #header>
        <span>Tabela de Usuarios</span>
      </template>
      <TablesTableUsuarios :visible="dialogTableVisible" @show-table="showTable" @linha-clicada="preencherFormulario"
        class="tabela" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import type { IUsuario } from "~/types/IUsuario";

const dialogTableVisible = ref(false)
const usuario = ref<IUsuario>()

const preencherFormulario = (linhaClicada: IUsuario) => {
  usuario.value = linhaClicada
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

.tabela {
  margin-top: 10px;
}

.el-dialog .el-dialog__body {
  padding-top: 0px;
}

.el-dialog .el-dialog__header {
  padding-bottom: 0px;
}
</style>