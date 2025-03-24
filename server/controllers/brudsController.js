import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllBruds = async (req, res) => {
    const bruds = await prisma.bruds.findMany({
        orderBy: {
          NOME: 'asc', // Ordenar por nome em ordem crescente
        }});
    res.json(bruds);
};

export const getBrudById = async (req, res) => {
    const { id_bruds } = req.params;
    const brud = await prisma.bruds.findUnique({ where: { ID_BRUDS: Number(id_bruds) } });
    res.json(brud);
};

export const getBrudsByNome = async (req, res) => {
    const { nome } = req.params;
    const bruds = await prisma.bruds.findMany({ where: { NOME: { startsWith: nome + '%' } } });
    res.json(bruds);
};

export const getBrudsByEstado = async (req, res) => {
    const { estado } = req.params;
    const bruds = await prisma.bruds.findMany({ where: { ESTADO: { equals: estado} } });
    res.json(bruds);
};