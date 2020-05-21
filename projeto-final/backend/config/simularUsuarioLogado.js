const db = require("./db");
const { getUsuarioLogado } = require("../resolvers/comum/usuario");

const sql = `
  SELECT
    u.*
  FROM
    usuarios u
    INNER JOIN usuarios_perfis up ON up.usuario_id = u.id
    INNER JOIN perfis p ON up.perfil_id = p.id
  WHERE
    u.ativo = 1
    AND p.nome = :nome
  LIMIT 1
`;

const getUsuario = async (nomePerfil) => {
  const res = await db.raw(sql, { nome: nomePerfil });
  return res ? res[0][0] : null
};

module.exports = async req => {
  const usuario = await getUsuario('admin')
  if(usuario){
    const { token } = await getUsuarioLogado(usuario)
    req.headers = {
      authorization: `Bearer ${token}`
    }
  }
}