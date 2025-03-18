import { defineStore } from 'pinia';
export const breadcrumbsStore = defineStore('breadcrumbs', {
  state: () => ({
    breadcrumbs: [] as string[][], // Inicialize como um array vazio
  
  }),
  actions: {
    setBreadcrumbs(value: string[][]) {
      this.breadcrumbs = value
    },
    deleteLastBreadcrumb(){
      if (this.breadcrumbs.length > 1)
        this.breadcrumbs.pop()
      else{
        this.breadcrumbs.pop()
        this.breadcrumbs.push([ '1', 'Home', '/','Seja Bem Vindo' ])}
    }
  },
});