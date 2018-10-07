const table = 'attendees'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
        id: 1,
        name: 'Julia',
        age: 2,
        registration_id: 1
      }, {
        id: 2,
        name: 'Henry',
        age: 3,
        registration_id: 1
      }, {
        id: 3,
        name: 'Rose',
        age: 4,
        registration_id: 3
      }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};