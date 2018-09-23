const table = 'free_items'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
            seller_id: 1,
            buyer_id: 2,
            image_url: 'https://i5.walmartimages.com/asr/a8bcc471-f339-4ad2-a203-b25ad0b42467_1.0134941b40d483a41c9861dce1febd6e.jpeg',
            description: "This is a pair of headphones for toddlers.",
          }
        ])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};