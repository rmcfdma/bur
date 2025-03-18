import type { IComponente, IFuncao } from "./interfaces";

export interface IFuncoesComponentes{
    ID_FUNCOES:  number;
    ID_COMPONENTES: number;
    DATA_INICIO: Date; 
    componentes: IComponente;
    funcoes: IFuncao;
}