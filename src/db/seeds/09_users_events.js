const table = 'users_events'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
            user_id: 1,
            event_id: 1
          }, {
            user_id: 1,
            event_id: 2
          },
          {
            user_id: 2,
            event_id: 3
          }
        ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};