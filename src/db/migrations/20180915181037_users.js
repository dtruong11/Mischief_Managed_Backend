const table = 'users'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable().defaultsTo('')
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.integer('zip').notNullable().defaultsTo(0)
    table.string('avatar').notNullable().defaultsTo('https://goo.gl/ZCTNp3')
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};