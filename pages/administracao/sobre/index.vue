<template>
    <PageHeader />
    <h1>Administração de <i class="fa fa-stumbleupon-circle" aria-hidden="true"></i></h1>
</template>
<script setup>
definePageMeta({
    middleware: [
        'auth',
        // Add in more middleware here
    ]
});
</script>