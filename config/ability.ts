import { defineAbility } from '@casl/ability';
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

export default defineAbility((can, cannot) => {
  cannot('ver', 'Administracao', { role: [17, 18, 19, 20, 22] });
  can('ver', 'Componentes', { role: [1, 2 ,3 ,4 ,5 ,6] });
  can('ver', 'Relatorios', { role: [1, 2 ,3 ,4 ,5 ,6, 9, 10, 11, 12, 15, 16] });
  can('ver', 'Eventos', { role: [1, 2, 3, 4, 11, 12] });
  can('ver', 'Bandas', { role: [1, 5] });
  can('ver', 'Repertorio', { role: [3, 4, 7, 8] });
  can('ver', 'Instrumentos', { role: [1, 2, 9, 10] });
  can('ver', 'Usuarios', { role: [1, 2, 3, 4] });
  can('ver', 'Configuracao', { role: [2, 4] });
});
