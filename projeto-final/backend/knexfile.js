// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    database: 'projeto-final-cod3r-graphql',
    user: 'root',
    password: 'root'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
