<template>
    <div class="container_username">
        <el-avatar class="avatar" :size='30' :src='circleUrl' />
        <el-text class="username mx-1" type="primary" size="large">{{ store.isAuthenticated ? store.getUsuario?.USERNAME
            : 'Olá Visitante!' }}</el-text>
        <!-- {{ store.getUsuario['componentes']['funcoes_componentes'][0]['funcoes']['ID_FUNCOES'] }} -->
    </div>
</template>
<script lang='ts' setup>
import { authStore } from '@/store/auth';
const store = authStore();
const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl } = toRefs(state)

</script>
<style>
.saudacao {
    background-color: azure;
}

.container_username {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.username {
    margin-left: 5px;
}
</style>