const {
  hashSync
} = require('bcryptjs')

const table = 'volunteers'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    first_name: "Harry",
    last_name: "Potter",
    email: "student@galvanize.com",
    password: hashSync('password'),
    city: 'Mercer Island',
    state: "Washington",
    zip: 98040,
    avatar: 'https://goo.gl/KZGVvt'
  }, {
    id: 2,
    first_name: 'Hermione',
    last_name: 'Granger',
    email: 'instructor@galvanize.com',
    password: hashSync('password'),
    city: 'Bellevue',
    state: "Washington",
    zip: 98004,
    avatar: 'https://goo.gl/FTZkYy'
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};