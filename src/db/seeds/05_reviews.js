const table = 'reviews'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
        user_id: 1,
        event_id: 1,
        content: "My daughters have been coming to The Little Gym for years.  We have done the parent child classes, individual classes, camps, birthday parties and parent survival nights.   Both girls always have a great time.  The teachers love the kiddos.  They are well skilled and have a lot to teach the kids.  The socialization and sportsmanship lessons the kids learn in class are helpful.  The classes and parties are well organized.  It has been amazing watching my older daughter advance through the classes.",
        votes: 5
      }, {
        user_id: 1,
        event_id: 2,
        content: "My kids had so much fun here. Thank you for organizing such a great event.",
        votes: 4
      },
      {
        user_id: 2,
        event_id: 3,
        content: "I highly recommend this event.",
        votes: 4
      },
      {

        user_id: 2,
        event_id: 4,
        content: "I highly recommend this event.",
        votes: 5
      }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};