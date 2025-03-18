import { defineStore } from 'pinia';

export const tableStore = defineStore('table', {
    state: () => ({
        sizePage: 5,
        currentPage: 1,
        total: 0
    }),

    getters: {
        getSizePage: (state) => state.sizePage,
        getCurrentPage: (state) => state.currentPage,
        getTotal: (state) => state.total
    },

    actions: {
        setSizePage(sizePage: number) {
            this.sizePage = sizePage;
        },

        setCurrentPage(currentPage: number) {
            this.currentPage = currentPage;
        },

        setTotal(total: number) {
            this.total = total;
        }
    }
})