import { PrismaClient } from '@prisma/client'
import { deleteObjectInBucketAWS, deleteObjectsInBucketAWS } from '../aws/awsS3Handler.js';
const prisma = new PrismaClient()

const isArrayOf = (array, type) => {
  if (!(array instanceof Array) || !(typeof type === 'string'))
    return false
  if (array.length > 0)
    return array.every(elemento => typeof elemento === type)
  else
    return false
}

const isObjectEmpty = (obj) => {
  if (!obj)
    return true
  return Object.keys(obj).length === 0;
}

export const create = async (req, res) => {
  const { componente } = req.body.data;
  try {
    if (!componente || isObjectEmpty(componente))
      throw new Error("O componente não foi enviado.")
    const created = await prisma.componentes.create({
      data: {
        NOME: componente.NOME,
        CPF: componente.CPF,
        DATA_NASCIMENTO: componente.DATA_NASCIMENTO,
        LOGRADOURO: componente.LOGRADOURO,
        NUMERO: componente.NUMERO,
        BAIRRO: componente.BAIRRO,
        CIDADE: componente.CIDADE,
        ESTADO: componente.ESTADO,
        CEP: componente.CEP,
        TELEFONE: componente.TELEFONE,
        EMAIL: componente.EMAIL,
        FOTO: componente.FOTO,
        TEFA: componente.TEFA,
        DATA_INCLUSAO: componente.DATA_INCLUSAO,
        ID_BRUDS: componente.ID_BRUDS,
        funcoes_componentes: {
          create: componente.funcoes_componentes
        },
      },
    });
    res.status(201).json(created);
  } catch (erro) {
    console.log(erro)
    res.status(501).json(undefined);
  }
}

export const remove = async (req, res) => {
  const id_componente = parseInt(req.params.id);
  const cpf = req.params.cpf;

  try {
    const usuariosDeletados = prisma.usuarios.deleteMany({
      where: { ID_COMPONENTES: id_componente },
    });

    const emprestimosDeletados = prisma.emprestimos.deleteMany({
      where: { ID_COMPONENTES: id_componente },
    });

    const funcoesComponentesDeletados = prisma.funcoes_componentes.deleteMany({
      where: { ID_COMPONENTES: id_componente },
    });

    const componenteDeletado = prisma.componentes.deleteMany({
      where: { ID_COMPONENTES: id_componente },
    });

    await prisma.$transaction([usuariosDeletados, emprestimosDeletados, funcoesComponentesDeletados, componenteDeletado])
    await deleteObjectInBucketAWS("imagensbur", `fotoscomponentes/${cpf}.jpg`)

    res.json({ "resultado": "1" });
  } catch (error) {
    console.log(error)
    if (error.code === 'NoSuchKey') {
      console.error('Objeto não encontrado:', objectKey);
    } else {
      console.error('Erro ao remover o objeto:', error);
    }
    res.status(500).json({ "resultado": "0" });
  }
  finally {
    await prisma.$disconnect();
  }
}

export const removeAll = async (req, res) => {
  const { listaId, listaJpeg } = req.body;
  const array = listaId.map(valor => Number(valor));
  try {
      const usuariosDeletados = prisma.usuarios.deleteMany({
        where: { ID_COMPONENTES: { in: array } },
      });

      const emprestimosDeletados = prisma.emprestimos.deleteMany({
        where: { ID_COMPONENTES: { in: array } },
      });

      const funcoesComponentesDeletados = prisma.funcoes_componentes.deleteMany({
        where: { ID_COMPONENTES: { in: array } },
      });

      const componentesDeletados = prisma.componentes.deleteMany({
        where: {
          ID_COMPONENTES:
            { in: array }
        },
      })

      await prisma.$transaction([usuariosDeletados, emprestimosDeletados, funcoesComponentesDeletados, componentesDeletados])
      await deleteObjectsInBucketAWS('imagensbur', listaJpeg)
    res.status(200).json({ "resultado": "1" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ "resultado": "0" });
  } finally {
    //await prisma.$disconnect();
  }
}

export const edit = async (req, res) => {
  const { componente, exclusao, inclusao } = req.body.data;
  try {
    if (!componente || isObjectEmpty(componente))
      throw new Error("O componente não foi enviado na requisição.")
    if (!inclusao)
      throw new Error("As funções que o componente deve ocupar não foram definidas ou não foram enviadas.")
    const componenteAtualizado = await prisma.componentes.update({
      where: {
        ID_COMPONENTES: Number(componente.ID_COMPONENTES)
      },
      data: {
        NOME: componente.NOME,
        CPF: componente.CPF,
        DATA_NASCIMENTO: componente.DATA_NASCIMENTO,
        LOGRADOURO: componente.LOGRADOURO,
        NUMERO: componente.NUMERO,
        BAIRRO: componente.BAIRRO,
        CIDADE: componente.CIDADE,
        ESTADO: componente.ESTADO,
        CEP: componente.CEP,
        TELEFONE: componente.TELEFONE,
        EMAIL: componente.EMAIL,
        FOTO: componente.FOTO,
        TEFA: componente.TEFA,
        DATA_INCLUSAO: componente.DATA_INCLUSAO,
        ID_BRUDS: componente.ID_BRUDS,
        funcoes_componentes: {
          deleteMany: {
            ID_FUNCOES: {
              in: exclusao
            },
          },
          createMany: {
            data: inclusao
          },
        },
      },
    });
    res.status(201).json(componenteAtualizado);
  } catch (erro) {
    console.log(erro)
    res.status(501).json(undefined);
  }
}

export const getAllComponentes = async (req, res) => {
  const componentes = await prisma.componentes.findMany();
  res.json(componentes);
};

export const getComponenteById = async (req, res) => {
  const { id_componente } = req.params;
  const componente = await prisma.componentes.findUnique({
    where: {
      ID_COMPONENTES: Number(id_componente)
    },
    ...select(),
  });
  res.json(componente);
};

export const getComponenteAndBrudById = async (req, res) => {
  const { id_componente } = req.params;
  const comp = await prisma.componentes.findUnique(selectWithBrudAndUsuarioById(id_componente));
  res.json(comp);
};

export const getComponentesByBrud = async (req, res) => {
  const { id_brud } = req.params;
  const componentes = await prisma.componentes.findMany(selectWithBrudAndUsuarioByBrud(id_brud));
  res.json(componentes);
};

export const getComponentesAndUsuariosByBrud = async (req, res) => {
  const { id_brud } = req.params;
  //includeUsuario(Number(id_brud))
  const result = await prisma.componentes.findMany(
    { where: { ID_BRUDS: { equals: 1 } } });
  res.json(result);
};

export const getComponentesByName = async (req, res) => {
  const { nome } = req.params;
  const componentes = await prisma.componentes.findMany({ where: { NOME: { startsWith: nome + '%' } } });
  res.json(componentes);
};

export const getComponenteByFullame = async (req, res) => {
  const { fullname } = req.params;
  try {
    const componentes = await prisma.componentes.findMany({ where: { NOME: { equals: fullname } } });
    res.json(componentes);
  }
  catch (error) {
    console.log(error)
    res.status(500).json(undefined);
  }
};

export const getComponentesByTefa = async (req, res) => {
  const { tefa } = req.params;
  const componente = await prisma.componentes.findUnique(selectWithBrudAndUsuarioByTefa(tefa));
  res.json(componente);
};

export const getComponentesByCpf = async (req, res) => {
  const { cpf } = req.params;
  const componente = await prisma.componentes.findUnique(selectWithBrudAndUsuarioByCpf(cpf));
  res.json(componente);
};

export const getComponentesByNascimento = async (req, res) => {
  const { start, end } = req.params;
  const componentes = await prisma.componentes.findMany({
    where: {
      DATA_NASCIMENTO: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
  });
  res.json(componentes);
};

const selectWithBrudAndUsuarioById = (id_componentes) => ({
  select: {
    ...componente,
    bruds: {
      select: {
        ...brud
      }
    },
    usuarios: {
      select: {
        ...usuario
      }
    }
  },
  where: { ID_COMPONENTES: Number(id_componentes) }
})

const selectWithBrudAndUsuarioByBrud = (id_bruds) => ({
  select: {
    ...componente,
    bruds: {
      select: {
        ...brud
      }
    },
    usuarios: {
      select: {
        ...usuario
      }
    }
  },
  where: { ID_BRUDS: Number(id_bruds) }
})

export const getComponentesCount = async (req, res) => {
  const count = await prisma.componentes.count();
  res.json({ count: count });
};

const selectWithBrudAndUsuarioByTefa = (tefa) => ({
  select: {
    ...componente,
    bruds: {
      select: {
        ...brud
      }
    },
    usuarios: {
      select: {
        ...usuario
      }
    }
  },
  where: { TEFA: tefa }
})

const selectWithBrudAndUsuarioByCpf = (cpf) => ({
  select: {
    ...componente,
    bruds: {
      select: {
        ...brud
      }
    },
    usuarios: {
      select: {
        ...usuario
      }
    }
  },
  where: { CPF: cpf }
})

export const getComponentesByPage = async (req, res) => {
  const { page, size } = req.body.data;
  const startIndex = ((Number(page) - 1) * Number(size));
  const componentes = await prisma.componentes.findMany({
    skip: startIndex,
    take: Number(size),
    ...select()
  });
  res.json(componentes);
};

const componente = {
  ID_COMPONENTES: true,
  NOME: true,
  CPF: true,
  DATA_NASCIMENTO: true,
  LOGRADOURO: true,
  NUMERO: true,
  BAIRRO: true,
  CIDADE: true,
  ESTADO: true,
  CEP: true,
  TELEFONE: true,
  EMAIL: true,
  FOTO: true,
  TEFA: true,
  DATA_INCLUSAO: true,
  ID_BRUDS: true
}

const usuario = {
  ID_USUARIOS: true,
  USERNAME: true,
  PASSWORD: true,
  DATA_INCLUSAO: true,
  DATA_EXCLUSAO: true,
}

const brud = {
  ID_BRUDS: true,
  NOME: true,
  ESTADO: true,
  CIDADE: true,
  ID_BUR: true,
}

const funcoes_componentes = {
  ID_FUNCOES: true,
  ID_COMPONENTES: true,
  DATA_INICIO: true
}

const includeUsuario = (id_brud) => ({
  select: {
    ...componente,
    usuarios: {
      select: {
        ...usuario
      }
    }
  },
  where: { ID_BRUDS: { equals: id_brud } }
})

const includeComponenteWithFuncoes = () => {
}

const select = () => {
  return {
    select: {
      ...componente,
      bruds: {
        select: {
          ...brud,
        }
      },
      funcoes_componentes: {
        select: {
          ...funcoes_componentes,
        }
      }
    }
  }
}


