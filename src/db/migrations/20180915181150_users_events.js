const table = 'users_events'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.integer('user_id').notNullable().defaultsTo(0)
    table.integer('event_id').notNullable().defaultsTo(0)
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.foreign('event_id').references('events.id').onDelete('CASCADE')
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};