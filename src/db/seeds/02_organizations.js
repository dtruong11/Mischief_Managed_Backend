const {
  hashSync
} = require('bcryptjs')

const table = 'organizations'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    name: "The Little Gym",
    description: "At The Little Gym, we specialize in unique educational classes that revolve around active play.",
    email: "little@gym.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/N1UHnv',
    street: 'The Little Gym 2213 15th Ave W',
    city: 'Seattle',
    state: 'WA',
    zip: '98119',
    lat: 47.639059,
    long: -122.376559
  }, {
    id: 2,
    name: "Gymboree",
    description: "Gymboree Play & Music provides classes and fun activities for kids.",
    email: "gymboree@galvanize.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/mC5JgF',
    street: '575 Bellevue Way NE #310',
    city: 'Bellevue',
    state: 'WA',
    zip: '98004',
    lat: 47.615779,
    long: -122.203725
  }, {
    id: 3,
    name: 'Wiggle Works Kids',
    description: 'We are the premier award-winning indoor playground for kids under 48″ tall located in Bellevue and Puyallup, WA. We provide a super fun place for kids and a unique approach to staying active.',
    email: "wiggle@works.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/Woumsb',
    street: '15600 NE 8th St Suite G2',
    city: 'Bellevue',
    state: 'WA',
    zip: '98008',
    lat: 47.618666,
    long: -122.130378
  }, {
    id: 4,
    name: 'Kid\'s Quest',
    description: "KidsQuest Children's Museum is a hands-on, interactive children’s museum that encourages learning through play with an emphasis on science, technology, engineering, art and math. Exhibits and programs are geared towards children 0-10 and their families.",
    email: "kids@quest.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/i3i7zn',
    street: '1116 108th Ave NE',
    city: 'Bellevue',
    state: 'WA',
    zip: '98004',
    lat: 47.621638, 
    long: -122.195874
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};