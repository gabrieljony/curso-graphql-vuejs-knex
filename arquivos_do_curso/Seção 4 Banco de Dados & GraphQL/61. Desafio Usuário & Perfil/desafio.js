const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {

}

async function salvarPerfil(nome, rotulo) {

}

async function adicionarPerfis(usuario, ...perfis) {

}

async function executar() {
    const usuario = await salvarUsuario('Ana',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())