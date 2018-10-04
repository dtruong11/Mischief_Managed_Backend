const table = 'replies'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
        id: 1,
        post_id: 1,
        content: "Have you tried Mustela? The shampoo is not organic, but it is very good for sensitive skin. ",
      }, {
        id: 2,
        post_id: 1,
        content: "I will look into it and let you know."
      }, {
        id: 3,
        post_id: 2,
        content: "I like my little gym. They have many music classes for toddlers.",
      },
      {
        id: 4,
        post_id: 3,
        content: "Anyone knows of any good daycare on Mercer Island?",
      }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};