const {
  hashSync
} = require('bcryptjs')

const table = 'organizations'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    name: "The Little Gym",
    aboutus: "At The Little Gym, we specialize in unique educational classes that revolve around active play.",
    email: "little@gym.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/N1UHnv',
    street_org: 'The Little Gym 2213 15th Ave W',
    city_org: 'Seattle',
    state_org: 'WA',
    zip_org: '98119',
    lat_org: 47.639059,
    long_org: -122.376559
  }, {
    id: 2,
    name: "Gymboree",
    aboutus: "Gymboree Play & Music provides classes and fun activities for kids.",
    email: "gymboree@galvanize.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/mC5JgF',
    street_org: '575 Bellevue Way NE #310',
    city_org: 'Bellevue',
    state_org: 'WA',
    zip_org: '98004',
    lat_org: 47.615779,
    long_org: -122.203725
  }, {
    id: 3,
    name: 'Wiggle Works Kids',
    aboutus: 'We are the premier award-winning indoor playground for kids under 48″ tall located in Bellevue and Puyallup, WA. We provide a super fun place for kids and a unique approach to staying active.',
    email: "wiggle@works.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/Woumsb',
    street_org: '15600 NE 8th St Suite G2',
    city_org: 'Bellevue',
    state_org: 'WA',
    zip_org: '98008',
    lat_org: 47.618666,
    long_org: -122.130378
  }, {
    id: 4,
    name: 'Kid\'s Quest',
    aboutus: "KidsQuest Children's Museum is a hands-on, interactive children’s museum that encourages learning through play with an emphasis on science, technology, engineering, art and math. Exhibits and programs are geared towards children 0-10 and their families.",
    email: "kids@quest.com",
    password: hashSync('password'),
    logo: 'https://goo.gl/i3i7zn',
    street_org: '1116 108th Ave NE',
    city_org: 'Bellevue',
    state_org: 'WA',
    zip_org: '98004',
    lat_org: 47.621638, 
    long_org: -122.195874
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};