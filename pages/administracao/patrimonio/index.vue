<template>
    <PageHeader />
    <h1>Administração de Patrimônio</h1>
</template>
<script setup>
definePageMeta({
    middleware: [
        'auth', // Add in more middleware here
    ]
});
</script>