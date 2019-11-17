// Método para evoluir o BD - incrementar
exports.up = function (knex, Promise) {
    return knex.schema.createTable('perfis', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('rotulo').notNull()
    }).then(function() {
        return knex('perfis').insert([
            { nome: 'comum', rotulo: 'Comum' },
            { nome: 'admin', rotulo: 'Administrador' },
            { nome: 'master', rotulo: 'Master' }
        ])
    })
};
// Ao contrário do método up - decrementar
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('perfis')
};
