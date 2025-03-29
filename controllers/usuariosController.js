import { PrismaClient } from '@prisma/client'
//import { generateAccessToken, generateRefreshToken } from '../jwtUtils.js'
//import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

// Listar todos os usuários
export const getAllUsuarios = async (req, res) => {
  const usuarios = await prisma.usuarios.findMany({ ...comumSelect(), orderBy: { DATA_INCLUSAO: 'asc' } });
  res.json(usuarios);
};

export const getUsuariosById = async (req, res) => {
  const { id_usuarios } = req.params;
  const usuarios = await prisma.usuarios.findUnique({
    where: { ID_USUARIOS: Number(id_usuarios) },
    ...comumSelect()
  })
  res.json(usuarios);
};

export const getUsuarioByUsername = async (req, res) => {
  const { username } = req.params;
  const usuario = await prisma.usuarios.findUnique({
    where: { USERNAME: String(username) },
    ...comumSelect()
  });
  res.json(usuario);
};

export const getUsuarioByIdComponente = async (req, res) => {
  const { id_componente } = req.params;
  const usuario = await prisma.usuarios.findMany({
    where: { ID_COMPONENTES: Number(id_componente) }
  });
  res.json(usuario);
};

export const getUsuarioByNomeComponente = async (req, res) => {
  const { nome } = req.params;
  const usuarios = await prisma.usuarios.findMany({
    where: { componentes: { NOME: { startsWith: nome + '%' } } },
    ...comumSelect(), orderBy: { DATA_INCLUSAO: 'asc' }
  });
  res.json(usuarios);
};

export const getUsuarioByNomeComponenteNatyve = async (req, res) => {
  const { nome } = req.params;
  const usuarios = await prisma.$queryRaw(
    "SELECT ROW_NUMBER() OVER (ORDER BY DATA_INCLUSAO) as ordem, ID_USUARIOS, USERNAME, PASSWORD, DATA_INCLUSAO, DATA_EXCLUSAO, ID_COMPONENTES where  FROM usuarios;")
  res.json(usuarios);
};

export const getUsuariosCount = async (req, res) => {
  const count = await prisma.usuarios.count();
  res.json({ count: count });
};

export const getUsuariosByPage = async (req, res) => {
  const { page, size } = req.body;
  console.log("Pagina: " + page + "Size: " + size)
  const startIndex = ((Number(page) - 1) * Number(size));
  const usuarios = await prisma.usuarios.findMany({
    skip: startIndex,
    take: Number(size),
    ...comumSelect()
  });
  res.json(usuarios);
};

export const login = async (req, res) => {
  // const { username, password } = req.body.data;
  // try {
  //   const usuario = await prisma.usuarios.findMany({
  //     where: {
  //       USERNAME: {
  //         equals: username,
  //       },
  //       PASSWORD: {
  //         equals: password,
  //       },
  //     },
  //     ...comumSelect(),
  //   });
  //   if (usuario && usuario.length > 0) {
  //     const novo = { ...usuario }
  //     const accessToken = generateAccessToken(novo);
  //     const refreshToken = generateRefreshToken(novo)
  //     res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  //   } else {
  //     res.status(401).json({ message: 'Credenciais inválidas' });
  //   }
  // } catch (erro) {
  //   // Erro de conexão com o banco de dados
  //   if (erro.code === 'P1001') {
  //     res.status(500).json({ message: 'Sem conexão com o banco de dados' });
  //   }
  // } finally {
  //   await prisma.$disconnect();
  // }
};

export const novo = async (req, res) => {
  const { usuario } = req.body;
  const data_exclusao = usuario.DATA_EXCLUSAO ? usuario.DATA_EXCLUSAO : null
  try {
    const usuarioCriado = await prisma.usuarios.create({
      data: {
        "USERNAME": usuario.USERNAME,
        "PASSWORD": usuario.PASSWORD,
        "DATA_INCLUSAO": new Date(usuario.DATA_INCLUSAO),
        "DATA_EXCLUSAO": data_exclusao,
        "ID_COMPONENTES": usuario.ID_COMPONENTES,
      },
    });
    res.status(201).json(usuarioCriado);
  } catch (erro) {
    console.log(erro)
  }
}

export const removeAll = async (req, res) => {
  const lista = req.body;
  const array = lista.map(valor => Number(valor));

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.usuarios.deleteMany({
        where: {
          ID_USUARIOS:
            { in: array }
        },
      })
    })
    res.json({ "resultado": "1" });
  } catch (erro) {
    res.status(500).json({ "resultado": "0" });
  } finally {
    await prisma.$disconnect();
  }
}

export const remove = async (req, res) => {
  const id_usuarios = parseInt(req.params.id);
  try {
    await prisma.usuarios.delete({
      where: { ID_USUARIOS: id_usuarios },
    });
    res.json({ "resultado": "1" });
  } catch (erro) {
    res.status(500).json({ "resultado": "0" });
  }
}

export const alterar = async (req, res) => {
  ///const id_usuarios = parseInt(req.params.id);
  const { usuario } = req.body;
  const data_exclusao = usuario.DATA_EXCLUSAO ? usuario.DATA_EXCLUSAO : null
  try {
    const usuarioAtualizado = await prisma.usuarios.update({
      where: {
        ID_USUARIOS: Number(usuario.ID_USUARIOS)
      },
      data: {
        "USERNAME": usuario.USERNAME,
        "PASSWORD": usuario.PASSWORD,
        "DATA_INCLUSAO": new Date(usuario.DATA_INCLUSAO),
        "DATA_EXCLUSAO": data_exclusao,
        "ID_COMPONENTES": usuario.ID_COMPONENTES

      },
    });
    res.json(usuarioAtualizado);
  } catch (erro) {
    console.log(erro)
  }
}

// export const getRefreshToken = async (req, res) => {
//   const { refreshToken } = req.body;
//   try {
//     const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET);
//     console.log("O conteúdo do refreshToken é: " + [...decodedRefreshToken])
//     // Gere um novo token de acesso
//     const newAccessToken = generateAccessToken(decodedRefreshToken['0']);
//     // Responda com o novo token de acesso
//     return res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       // Se o refresh token for inválido, envie uma resposta 401 (não autorizado)
//       //name: error.name, message: 'RefreshToken expirado.'
//       return res.status(401).json({ name: error.name, message: 'RefreshToken expirado.' });
//     }// } 
//     else {
//       // Caso ocorra outro erro com o jwt, envie uma resposta 401 (não autorizado)
//       return res.status(401).json({ name: error.name, message: 'Outro erro' });
//     }

//   }
// }

function comumSelect() {
  return {
    select: {
      ID_USUARIOS: true,
      USERNAME: true,
      DATA_INCLUSAO: true,
      componentes: {
        select: {
          ID_COMPONENTES: true,
          NOME: true,
          FOTO: true,
          CPF: true,
          TEFA: true,
          EMAIL: true,
          DATA_NASCIMENTO: true,
          bruds: {
            select: {
              ID_BRUDS: true,
              NOME: true,
              CIDADE: true,
              ESTADO: true,
            }
          },
          funcoes_componentes: {
            select: {
              DATA_INICIO: true,
              funcoes: {
                select: {
                  ID_FUNCOES: true,
                  FUNCAO: true
                },
              },
            },
          },
        }
      }
    }
  }
}





