const table = 'reviews'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
            user_id: 1,
            event_id: 1,
            content: "We had so much fun.",
            votes: 2
          }, {
            user_id: 1,
            event_id: 2,
            content: "My kids had so much fun here. Thank you for organizing such a great event.",
            votes: 3
          },
          {
            user_id: 2,
            event_id: 3,
            content: "I highly recommend this event.",
            votes: 1
          }
        ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};