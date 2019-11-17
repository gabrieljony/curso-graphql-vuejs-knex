const db = require('../../config/db')

module.exports = {
    async perfis(usuario) {
        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfis.id',
                'usuarios_perfis.perfil_id'
            )
            .where({ usuario_id: usuario.id })
    }
}

// #a consulta a ser realizada
// SELECT p.*
// FROM perfis p, usuarios_perfis up
// WHERE up.perfil_id = p.id 
// AND up.usuario_id = 1;