import type { IEmprestimo } from "./IEmprestimo";
import type { IUsuario } from "./IUsuario";
import type { IBrud, IFuncao_componente } from "./interfaces";

export interface IComponente {
  ID_COMPONENTES: number,
  NOME: String,
  CPF : String,
  DATA_NASCIMENTO: Date,
  LOGRADOURO: String,
  NUMERO: String,
  BAIRRO: String,
  CIDADE: String,
  ESTADO: String,
  CEP: String,
  TELEFONE: String,
  EMAIL: String,
  FOTO : String,
  TEFA: String,
  DATA_INCLUSAO: Date,
  ID_BRUDS: number
  bruds: IBrud,
  emprestimos : IEmprestimo,
  funcoes_componentes: IFuncao_componente[],
  }