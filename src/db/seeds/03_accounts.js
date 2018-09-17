const {
  hashSync
} = require('bcryptjs')

const table = 'accounts'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    email: "student@galvanize.com",
    password: hashSync('password'),
    user_id: 1,
    org_id: 0
  }, {
    id: 2,
    email: 'instructor@galvanize.com',
    password: hashSync('password'),
    user_id: 2,
    org_id: 0
  }, {
    id: 3,
    email: "little@gym.com",
    password: hashSync('password'),
    user_id: 0,
    org_id: 1
  }, {
    id: 4,
    email: "gymboree@galvanize.com",
    password: hashSync('password'),
    user_id: 0,
    org_id: 2
  }, {
    id: 5,
    email: "wiggle@works.com",
    password: hashSync('password'),
    user_id: 0,
    org_id: 3
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};