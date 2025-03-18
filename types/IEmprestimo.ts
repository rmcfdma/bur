import type { IComponente } from "./IComponente";
import type { IPatrimonio } from "./IPatrimonio";

export interface IEmprestimo {
  ID_PATRIMONIO: number,
  ID_COMPONENTES: number,
  DATA_INICIO: Date,
  DATA_FIM: Date,
  ACESSORIOS: string,
  OBSERVACAO: string,
  componentes: IComponente,
  patrimonio: IPatrimonio
}