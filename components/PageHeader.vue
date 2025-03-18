<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(rota, index) in store.breadcrumbs" :key="index" :to="{ path: rota[2] }">
            {{ rota[1] }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { breadcrumbsStore } from '../store/breadcrumbs';
const store = breadcrumbsStore();
</script>
    


