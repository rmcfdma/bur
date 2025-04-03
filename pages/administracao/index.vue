<template>
    <PageHeader />
    Página de Administração
</template>
<script setup>
definePageMeta({
    middleware: [
        'auth',
        // Add in more middleware here
    ]
});
</script>
