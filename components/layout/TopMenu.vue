<template>
    <!-- {{ auth_store.getUsuario['componentes']['funcoes_componentes'] }} -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item key="1" index='1' route="/">Home</el-menu-item>
        <el-sub-menu key="2" index='2' route="/eventos">
            <template #title>Eventos</template>
            <el-menu-item key="2.1" index="2.1" route="/eventos/proximos">Próximos</el-menu-item>
            <el-menu-item key="2.2" index="2.2" route="/eventos/nacionais">Nacionais</el-menu-item>
            <el-menu-item key="2.3" index="2.3" route="/eventos/internacionais">Internacionais</el-menu-item>
            <el-menu-item key="2.4" index="2.4" route="/eventos/culturais">Culturais</el-menu-item>
        </el-sub-menu>
        <el-sub-menu key="3" index='3' route="/repertorio">
            <template #title>Repertório</template>
            <el-menu-item key="3.1" index="3.1" route="/repertorio/racionais">Racionais</el-menu-item>
            <el-menu-item key="3.2" index="3.2" route="/repertorio/dobrados">Dobrados</el-menu-item>
            <el-menu-item key="3.3" index="3.3" route="/repertorio/hinos">Hinos</el-menu-item>
            <el-menu-item key="3.4" index="3.4" route="/repertorio/toques">Toques</el-menu-item>
            <el-menu-item key="3.5" index="3.5" route="/repertorio/diversas">Diversas</el-menu-item>
            <el-menu-item key="3.6" index="3.6" route="/repertorio/rjb">Racional Jazz Band</el-menu-item>
        </el-sub-menu>
        <el-sub-menu key="4" index='4' route="/musica">
            <template #title>Música</template>
            <el-menu-item key="4.1" index="4.1" route="/musica/teoria_musical">Teoria Musical</el-menu-item>
            <el-menu-item key="4.2" index="4.2" route="/musica/regencia">Regência</el-menu-item>
            <el-menu-item key="4.3" index="4.3" route="/musica/harmonia">Harmonia</el-menu-item>
            <el-menu-item key="4.4" index="4.4" route="/musica/digitacao">Digitação</el-menu-item>
            <el-menu-item key="4.5" index="4.5" route="/musica/divisao">Divisão</el-menu-item>
            <el-menu-item key="4.6" index="4.6" route="/musica/solfejo">Solfejo</el-menu-item>
            <el-menu-item key="4.7" index="4.7" route="/musica/sopro">Sôpro</el-menu-item>
            <el-menu-item key="4.8" index="4.8" route="/musica/percussao">Percussão</el-menu-item>
            <el-menu-item key="4.9" index="4.9" route="/musica/video_aulas">Vídeo Aulas</el-menu-item>
            <el-menu-item key="4.10" index="4.10" route="/musica/provas">Provas</el-menu-item>
        </el-sub-menu>
        <!-- !!auth_store.isAuthenticated -->
        <el-sub-menu v-show="$can('ver', 'Administracao')" key="5" index="5" route="/administracao">
            <template #title>Administração</template>
            <el-menu-item v-show="$can('ver', 'Bandas')" key="5.1" index="5.1" route="/administracao/bandas">Bandas</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Eventos')" key="5.2" index="5.2" route="/administracao/eventos">Eventos</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Repertorio')" key="5.3" index="5.3" route="/administracao/repertorio">Repertório</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Componentes')" key="5.4" index="5.4" route="/administracao/componentes">Componentes</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Patrimonio')" key="5.5" index="5.5" route="/administracao/patrimonio">Patrimônio</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Usuarios')" key="5.6" index="5.6" route="/administracao/usuarios">Usuários</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Relatorios')" key="5.7" index="5.7" route="/administracao/relatorios">Relatórios</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Financeiro')" key="5.8" index="5.8" route="/administracao/financeiro">Financeiro</el-menu-item>
            <el-menu-item v-show="$can('ver', 'Configuracao')" key="5.9" index="5.9" route="/administracao/configuracao">Configuração</el-menu-item>
        </el-sub-menu>
        <el-menu-item key="6" index='6' route="/sobre">Sobre</el-menu-item>
        <el-menu-item key="7" index='7' route="/contato">Contato</el-menu-item>
        <el-menu-item v-show="!auth_store.isAuthenticated" key="8" index='8' route="/login">Login</el-menu-item>
        <el-menu-item v-show="auth_store.isAuthenticated" key="9" index='9' route="/">Sair</el-menu-item>
    </el-menu>
</template>

<script lang='ts' setup>
import { breadcrumbsStore } from '@/store/breadcrumbs';
import { authStore } from '@/store/auth';
import json_items from '@/assets/json/menu-topo-rotas.json';
import useAbility from '~/composables/ability';
import type { IFuncoesComponentes } from '~/types/IFuncoesComponente';

const breadcrumbs_store = breadcrumbsStore();
const auth_store = authStore();
const { setBreadcrumbs } = breadcrumbs_store;
const activeIndex = ref('1');

// Verifica se o usuário tem permissão para usar o recurso
const $can = (action: string, subject: string) => {
    let pode = false;
    if (auth_store.getUsuario) {
        // Pega as funções do usuário logado em auth_store
        const funcoes_componentes: [] = auth_store.getUsuario['componentes']['funcoes_componentes']
        // Realiza um loop para verificar todas as funções que o usuário ocupa 
        funcoes_componentes.forEach((item: IFuncoesComponentes, index: number, array: IFuncoesComponentes[]) => {
            // Verifica se a função atual possui a habilidade
            const ability = useAbility(item.funcoes.ID_FUNCOES)
            if (ability.can(action, subject))
                pode = true
        })
    }
    return pode
}


// const getFuncoesComponente = () => {
//     // [0]['funcoes']['FUNCAO']
//     return auth_store.getUsuario['componentes']['funcoes_componentes']
// }

const handleSelect = (index: string) => {
    //console.log(index)
    // Coloca o foco no elemento de índice igual a index.
    activeIndex.value = index;
    // Prepara um breadcrumb recebendo um índice x.y.z e autaliza
    // a store breadcrumb com os índice expandidos e seus respectivos
    // labels e links.
    prepareBreadcrumbs(index)
    // Caso o elemento selecionad seja o de índice seja 9 (Sair) 
    // executa a função logout que limpa a store pinia e o localStorage.
    if (index === "9") {
        logout()
    }
}

//Transforma um indice do tipo 2.1.3 em ['2','2.1','2.1.3']
function expandIndex(string: string) {
    let lista: string[] = []
    if (string.includes("."))
        string.split(".").forEach((item, index, array) => {
            if (index === 0) {
                lista.push(item)
            }
            else {
                lista.push(lista[index - 1] + "." + array[index])
            }
        })
    else
        lista.push(string)
    return lista
}

//Coloca um array e os subarrays em um único array
function orderedArray(array: (string | string[])[]) {
    const superarray: (string | string[])[] = []
    array.forEach((item: (string | string[])) => {
        superarray.push(item.slice(0, 4))
        if (item[4].length > 0) {
            superarray.push(...item[4]);
        }
    });
    return superarray
}

//Retorna os registros requeridos
function findForIndexes(array: (string | string[])[], indices: string[]) {
    let lista: (string | string[])[] = []
    const lista_ordenada = orderedArray(array)
    indices.forEach(indice => {
        lista_ordenada.forEach((item: string | string[]) => {
            if (item[0] === indice) {
                lista.push(item.slice(0, 4));
            }
        })
    })
    return lista
}

const prepareBreadcrumbs = (index: string) => {
    //Expande um índice com sub-índices. Ex. x.y.z -> [x, x.y, x.y.z]
    let array_index: string[] = expandIndex(index)
    //Recupera os registros os repertórios em /assets/json/menu-topo-rotas.json conforme os ítems em array_index
    let breads: (string | string[])[] = findForIndexes(json_items as (string | string[])[], array_index)
    //Cria um array de arrays de strings vazio
    let breadcrumbs: string[][] = [];
    //Coloca cada ítem de breads em breadcrumbs
    breads.forEach(item => breadcrumbs.push(item as string[]))
    //Atualiza a store breadcrumbs
    setBreadcrumbs(breadcrumbs)
}

const logout = () => {
    auth_store.clearAccessToken();
    auth_store.clearRefreshToken();
}

// const getFuncoesComponente = () => {
//     // [0]['funcoes']['FUNCAO']
//     return auth_store.getUsuario['componentes']['funcoes_componentes']
// }

// // const $can = (action: string, subject: string) => {
// //   const funcoes: number[] = [] 
// //   const funcoes_componentes = auth_store.getUsuario['componentes']['funcoes_componentes']
// //   funcoes_componentes.forEach((item: funcoes_componentes, index: number, array: funcoes_componentes[])=>{
// //      funcoes.push(item.ID_FUNCOES)
// //   })
//   return $ability.can(action, subject, { role: funcoes }); 
//   };
</script>

<style>
.link-toolbar {
    text-decoration: none;
}
</style>