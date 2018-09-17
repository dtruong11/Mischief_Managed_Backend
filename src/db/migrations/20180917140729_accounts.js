const table = 'accounts'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('email').notNullable().unique()
    table.text('password').notNullable()
    table.integer('org_id').notNullable().defaultsTo(0)
    table.foreign('org_id').references('organizations.id').onDelete('CASCADE')
    table.integer('user_id').notNullable().defaultsTo(0)
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};


