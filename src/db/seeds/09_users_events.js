const table = 'users_events'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
            user_id: 1,
            event_id: 1,
            favorite: true,
            registered: true 
          }, {
            user_id: 1,
            event_id: 2,
            favorite: true,
            registered: false
          },
          {
            user_id: 2,
            event_id: 3,
            favorite: true,
            registered: true 
          },
          {
            user_id: 2,
            event_id: 4,
            favorite: false,
            registered: true  
          }
        ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};