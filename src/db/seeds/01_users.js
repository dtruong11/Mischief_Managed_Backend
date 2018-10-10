const {
  hashSync
} = require('bcryptjs')

const table = 'users'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    first_name: "Diep",
    last_name: "Truong",
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
  }, {
    id: 3,
    first_name: 'Ashley',
    last_name: 'Holmes',
    email: 'ashley@gmail.com',
    password: hashSync('password'),
    city: 'Kirland',
    state: "Washington",
    zip: 98033,
    avatar: 'https://goo.gl/YkPmzA'
  }, {
    id: 4,
    first_name: 'Michael',
    last_name: 'Labranche',
    email: 'michael@gmail.com',
    password: hashSync('password'),
    city: 'Redmond',
    state: "Washington",
    zip: 98008,
    avatar: 'https://goo.gl/8rUWrD'
  }, {
    id: 5,
    first_name: 'Guillaume',
    last_name: 'Kay',
    email: 'gkay@gmail.com',
    password: hashSync('password'),
    city: 'Issaquah',
    state: "Washington",
    zip: 98027,
    avatar: 'https://goo.gl/AciskH'
  }, {
    id: 6,
    first_name: 'Asim',
    last_name: 'Fahan',
    email: 'asim@gmail.com',
    password: hashSync('password'),
    city: 'Auburn',
    state: "Washington",
    zip: 98002,
    avatar: 'https://goo.gl/AciskH'
  }, {
    id: 7,
    first_name: "Harry",
    last_name: "Potter",
    email: "harry@galvanize.com",
    password: hashSync('password'),
    city: 'Bellevue',
    state: "Washington",
    zip: 98004,
    avatar: 'https://goo.gl/KZGVvt'
  }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};