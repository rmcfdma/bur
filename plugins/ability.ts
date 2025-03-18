import ability from '@/config/ability';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('ability', ability);
});