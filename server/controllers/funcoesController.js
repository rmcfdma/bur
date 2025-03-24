import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Listar todos os usuários
export const getAllFuncoes = async (req, res) => {
  const funcoes = await prisma.funcoes.findMany();
  res.json(funcoes);
};

export const getFuncoesById = async (req, res) => {
  const { id_funcao } = req.params;
  const funcao = await prisma.funcoes.findUnique({ where: { ID_FUNCOES: Number(id_funcao) } });
  res.json(funcao);
};

export const getFuncoesByFuncao = async (req, res) => {
    const {funcao} = req.params;
    const funcoes = await prisma.funcoes.findMany({ where: { FUNCAO: {startsWith: funcao + '%'} } });
    res.json(funcoes);
  };


  



