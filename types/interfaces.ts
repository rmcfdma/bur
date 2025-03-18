export interface IUsuario {
    ID_USUARIOS: number,
    USERNAME: string,
    PASSWORD: string,
    DATA_INCLUSAO: Date,
    DATA_EXCLUS: Date,
    componentes: IComponente
  }

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
    bruds: IBrud;
    funcoes_componentes: IFuncao_componente[];
    }

export interface IBrud {
    ID_BRUDS: number;
    NOME: string;
    ESTADO: string;
    CIDADE: string;
  }

export interface IFuncao {
    ID_FUNCOES: number;
    FUNCAO: string;
}

export interface IFuncao_componente{
    DATA_INICIO: Date; 
    componentes: IComponente
    funcoes: IFuncao;
}