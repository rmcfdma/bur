export interface IPessoa {
    id: number;
    cpf: string;
    nome: string;
    data_nascimento: Date;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    telefone: string[];
    email: string;
    foto_url: string;
  }