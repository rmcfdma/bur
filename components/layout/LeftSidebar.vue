<template>
  Lado Esquerdo
  <el-radio-group v-if="null" v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu v-if="null" default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <img src="@/assets/svg/music-score.svg" width="30" height="25" />
        <span>Repertório</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Partituras</span></template>
        <el-menu-item index="1.1">Músicas Racionais</el-menu-item>
        <el-menu-item index="1.2">Hinos</el-menu-item>
        <el-menu-item index="1.3">Toques</el-menu-item>
        <el-menu-item index="1.4">Dobrados</el-menu-item>
        <el-menu-item index="1.5">Diversas</el-menu-item>
        <el-menu-item index="1.6">RJB</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>Letras</span></template>
        <el-menu-item index="1.7">Músicas Racionais</el-menu-item>
        <el-menu-item index="1.8">Diversas</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <img src="@/assets/svg/music-book.svg" width="30" height="28" />
        <span>Música</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Tutoriais</span></template>
        <el-menu-item index="2.1">Teoria Musical</el-menu-item>
        <el-menu-item index="2.2">Regência</el-menu-item>
        <el-menu-item index="2.3">Harmonia</el-menu-item>
        <el-menu-item index="2.4">Tabela de Digitação</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>Métodos</span></template>
        <el-menu-item index="2.5">Divisão Rítmica</el-menu-item>
        <el-menu-item index="2.6">Solfejo</el-menu-item>
        <el-menu-item index="2.7">Sôpro</el-menu-item>
        <el-menu-item index="2.8">Percussão</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="3">
      <img class="icon" src="@/assets/svg/music-test-2.svg" width="30" height="28" />
      <template #title>Provas</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon :size="30">
        <VideoCameraFilled />
      </el-icon>
      <template #title>Vídeo Aulas</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon :size="30">
        <setting />
      </el-icon>
      <template #title>Configuração</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, VideoCameraFilled
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style>
.icon {
  fill: #000000
}

.icon:active {
  fill: #409EFF
}
</style>