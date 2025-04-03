<template>
   <PageHeader />
   <h1>Administração da Pág. Sobre</h1>
</template>
<script setup>
definePageMeta({
   middleware: [
      'auth',
      // Add in more middleware here
   ]
});
</script>