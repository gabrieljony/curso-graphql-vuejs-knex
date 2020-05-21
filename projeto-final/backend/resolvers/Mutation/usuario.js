const bcrypt = require("bcrypt-nodejs");
const db = require("../../config/db");
const { perfil: obterPerfil } = require("../Query/perfil");
const { usuario: obterUsuario } = require("../Query/usuario");

const mutations = {
  registrarUsuario(_, { dados }) {
    return mutations.novoUsuario(_, {
      dados: {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        perfis: null,
      },
    });
  },
  async novoUsuario(_, { dados }, context) {
    if (context) {
      context.validarAdmin();
    }
    try {
      const idsPerfis = [];

      if (!dados.perfis || !dados.perfis.length) {
        console.log("result", !dados.perfis)
        console.log("result2",  !dados.perfis.length)
        dados.perfis = [
          {
            nome: "comum",
          },
        ];
      }

      for (let filtro of dados.perfis) {
        const perfil = await obterPerfil(_, {
          filtro,
        });
        if (perfil) idsPerfis.push(perfil.id);
      }

      // criptografar a senha do usuario
      const salt = bcrypt.genSaltSync();
      dados.senha = bcrypt.hashSync(dados.senha, salt);

      delete dados.perfis;
      const [id] = await db("usuarios").insert(dados);

      for (let perfil_id of idsPerfis) {
        await db("usuarios_perfis").insert({ perfil_id, usuario_id: id });
      }

      return db("usuarios").where({ id }).first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async excluirUsuario(_, args, context) {
    if (context) {
      context.validarAdmin();
    }
    try {
      const usuario = await obterUsuario(_, args);
      if (usuario) {
        const { id } = usuario;
        await db("usuarios_perfis").where({ usuario_id: id }).delete();
        await db("usuarios").where({ id }).delete();
      }
      return usuario;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async alterarUsuario(_, { filtro, dados }, context) {
    if (context) {
      context.validarUsuarioFiltro(filtro);
    }
    try {
      const usuario = await obterUsuario(_, { filtro });
      if (usuario) {
        const { id } = usuario;
        if (context.admin && dados.perfis) {
          await db("usuarios_perfis").where({ usuario_id: id }).delete();

          for (let filtro of dados.perfis) {
            const perfil = await obterPerfil(_, {
              filtro,
            });

            if (perfil) {
              await db("usuarios_perfis").insert({
                perfil_id: perfil.id,
                usuario_id: id,
              });
            }
          }
        }

        if (dados.senha) {
          // criptografar a senha do usuario
          const salt = bcrypt.genSaltSync();
          dados.senha = bcrypt.hashSync(dados.senha, salt);
        }

        delete dados.perfis;
        await db("usuarios").where({ id }).update(dados);
      }
      return !usuario ? null : { ...usuario, ...dados };
    } catch (e) {
      throw new Error(e);
    }
  },
};

module.exports = mutations;
