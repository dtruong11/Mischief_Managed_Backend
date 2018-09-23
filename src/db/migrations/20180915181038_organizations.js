const table = 'organizations'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('name').notNullable()
        table.text('description').notNullable()
        table.string('email').notNullable()
        table.text('password').notNullable()
        table.string('logo').notNullable()
        table.string('street')
        table.string('city')
        table.string('state')
        table.string('zip')
        table.string('lat')
        table.string('long')
        table.timestamps(true, true)
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};