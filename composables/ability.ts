

// 1: PRESIDENTE BUR
// 2: PRESIDENTE BRUD
// 3: MAESTRO BUR
// 4: MAESTRO BRUD
// 5: SECRETÁRIA BUR
// 6: SECRETÁRIA BRUD
// 7: DIRETOR MUSICAL BUR
// 8: DIRETOR MUSICAL BRUD
// 9: DIRETOR DE PATRIMÔNIO BUR
// 10: DIRETOR DE PATRIMÔNIO BRUD
// 11: DIRETOR SOCIAL BUR
// 12: DIRETOR SOCIAL BRUD
// 13: CONSELHEIRO FISCAL BUR
// 14: CONSELHEIRO FISCAL BRUD
// 15: TESOUREIRO(A) BUR
// 16: TESOUREIRO(A) BRUD
// 17: BALIZA
// 18: MÚSICO
// 19: PORTA BANDEIRA
// 20: PROFESSORA DE DANÇA
// 21: PROFESSORA DE MÚSICA
// 22: COLABORADOR
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
export default function useAbility(id_funcao: number) {
    const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);
    switch (id_funcao) {
        case 1:
            can('ver', ['Administracao', 'Componentes', 'Relatorios', 'Eventos', 'Bandas', 'Repertorio', 'Patrimonio', 'Financeiro', 'Usuarios', 'Configuracao'])
            break
        case 2:
            can('ver', ['Administracao', 'Componentes', 'Relatorios', 'Eventos', 'Repertorio', 'Patrimonio',  'Financeiro', 'Usuarios'])
            break
        case 3:
            can('ver', ['Administracao', 'Componentes', 'Relatorios', 'Eventos', 'Repertorio', 'Patrimonio', 'Usuarios', 'Configuracao'])
            break
        case 4:
            can('ver', ['Administracao', 'Componentes', 'Relatorios', 'Eventos', 'Repertorio', 'Patrimonio', 'Usuarios', 'Configuracao'])
            break
        case 5:
            can('ver', ['Administracao', 'Componentes', 'Relatorios'])
            break
        case 6:
            can('ver', ['Administracao', 'Componentes', 'Relatorios'])
            break
        case 7:
            can('ver', ['Administracao', 'Relatorios', 'Repertorio'])
            break
        case 8:
            can('ver', ['Administracao', 'Relatorios', 'Repertorio'])
            break
        case 9:
            can('ver', ['Administracao', 'Relatorios', 'Patrimonio'])
            break
        case 10:
            can('ver', ['Administracao', 'Relatorios', 'Patrimonio'])
            break
        case 11:
            can('ver', ['Administracao', 'Relatorios', 'Eventos'])
            break
        case 12:
            can('ver', ['Administracao', 'Relatorios', 'Eventos'])
            break
        case 13:
            can('ver', ['Relatorios'])
            break
        case 14:
            can('ver', ['Relatorios'])
            break
        case 15:
            can('ver', ['Administracao', 'Relatorios', 'Financeiro'])
            break
        case 16:
            can('ver', ['Administracao', 'Relatorios', 'Financeiro'])
            break
        case 21:
            can('ver', ['Administracao', 'Relatorios', 'Aulas'])
            break
    }
    return createMongoAbility(rules);
};


// const ability = defineAbility((can, cannot) => {
//     cannot('ver', 'Administracao', { role: [17, 18, 19, 20, 22] });
//     can('ver', 'Componentes', { role: [1, 2, 3, 4, 5, 6] });
//     can('ver', 'Relatorios', { role: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 15, 16] });
//     can('ver', 'Eventos', { role: [1, 2, 3, 4, 11, 12] });
//     can('ver', 'Bandas', { role: [1, 5] });
//     can('ver', 'Repertorio', { role: [3, 4, 7, 8] });
//     can('ver', 'Instrumentos', { role: [1, 2, 9, 10] });
//     can('ver', 'Usuarios', { role: [1, 2, 3, 4] });
//     can('ver', 'Configuracao', { role: [2, 4] });
// })


