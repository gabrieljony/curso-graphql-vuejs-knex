const db = require('../../config/db')

module.exports = {
    //busca por todos os perfis
    perfis() {
        return db('perfis')
    },
    //busca perfil passando um parametro(filtro)
    async perfil(_, { filtro }) {
        if(!filtro) return null
        const { id, nome } = filtro
        if(id) {
            return db('perfis')
                .where({ id })
                .first()
        } else if(nome) {
            return db('perfis')
                .where({ nome })
                .first()
        } else {
            return null
        }
    }
}