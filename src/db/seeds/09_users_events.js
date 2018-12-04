const table = 'users_events'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
        id: 1,
        user_id: 7,
        event_id: 1,
        favorite: true,
        registered: true,
        notes: 'We might be 10 minutes late.'
      },
      {
        id: 2,
        user_id: 2,
        event_id: 1,
        favorite: true,
        registered: true,
        notes: 'We are so excited about this event.'
      },
      {
        id: 3,
        user_id: 2,
        event_id: 4,
        favorite: true,
        registered: false,
        notes: ''
      }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};