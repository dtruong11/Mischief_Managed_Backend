const table = 'attendees'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('name').notNullable()
    table.integer('age').notNullable()
    table.integer('registration_id').notNullable().defaultsTo(0)
    table.foreign('registration_id').references('events.id').onDelete('CASCADE')
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};
