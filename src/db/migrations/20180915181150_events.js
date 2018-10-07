const table = 'events'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('title').notNullable()
    table.text('description').notNullable()
    table.string('image_url').notNullable().defaultsTo('https://cdn.dribbble.com/users/729829/screenshots/3011370/galshir-meshi.gif')
    table.integer('cost').notNullable().defaultsTo(0)
    table.integer('min_age').notNullable().defaultsTo(0)
    table.integer('max_age').notNullable()
    table.string('street').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('zip').notNullable()
    table.float('long').notNullable()
    table.float('lat').notNullable()
    table.boolean('sport').notNullable().defaultsTo(false)
    table.boolean('art').notNullable().defaultsTo(false)
    table.boolean('educational').notNullable().defaultsTo(false)
    table.boolean('nature').notNullable().defaultsTo(false)
    table.boolean('music').notNullable().defaultsTo(false)
    table.dateTime('start_date').notNullable();
    table.dateTime('end_date').notNullable();
    table.dateTime('cancelled_at').defaultTo(null);
    table.integer('org_id').notNullable().defaultsTo(0)
    table.foreign('org_id').references('organizations.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};