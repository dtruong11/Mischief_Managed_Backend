const table = 'organizations'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('name').notNullable()
        table.text('aboutus').notNullable()
        table.string('email').notNullable()
        table.text('password').notNullable()
        table.string('logo').notNullable()
        table.string('street_org')
        table.string('city_org')
        table.string('state_org')
        table.string('zip_org')
        table.string('lat_org')
        table.string('long_org')
        table.timestamps(true, true)
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};