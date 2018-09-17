const table = 'posts'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
            user_id: 1,
            content: "Hi everyone, does anyone know of any high quality organic kid's shampoo? ",
          }, {
            user_id: 1,
            content: "My kids love singing. What are some good summer camps or music studios in Seattle for toddlers? Thanks, all.",
          },
          {
            user_id: 2,
            content: "Anyone knows of any good daycare on Mercer Island?",
          }
        ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};