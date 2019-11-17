const db = require('../config/db')

db('perfis')
    .map(p => p.nome)
    .then(nomes => console.log(nomes))
    .finally(() => db.destroy())

db('perfis').select('nome', 'id')
    .then(res => console.log(res))
    .finally(() => db.destroy())

db.select('nome', 'id')
    .from('perfis')
    .then(res => console.log(res))
    .finally(() => db.destroy())

//Limitar as consultas, nesse exemplo limitando 4 registros
db.select('nome', 'id')
    .from('perfis')
    .limit(4)
    .then(res => console.log(res))
    .finally(() => db.destroy())

//Opção de começar de um determinado local usando offset
db.select('nome', 'id')
    .from('perfis')
    .limit(4)
    .offset(2)
    .then(res => console.log(res))
    .finally(() => db.destroy())

db('perfis')
    .where({ id: 2 })
    .first()
    .then(res => console.log(res.nome))
    .finally(() => db.destroy())

//Contem uma determinada palavra
db('perfis')
    .where('nome', 'like', '%min%')
    .then(res => console.log(res))
    .finally(() => db.destroy())

//Não trazer o parametro passado
db('perfis')
    .whereNot({ id: 2 })
    .then(res => console.log(res))
    .finally(() => db.destroy())

db('perfis')
    .select('nome', 'id')
    .whereIn('id', [1, 2, 3])
    .then(res => console.log(res))
    .finally(() => db.destroy())