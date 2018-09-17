const table = 'free_items'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.integer('seller_id').notNullable().defaultsTo(0)
        table.foreign('seller_id').references('users.id').onDelete('CASCADE')
        table.integer('buyer_id').notNullable().defaultsTo(0)
        table.foreign('buyer_id').references('users.id').onDelete('CASCADE')
        table.string('image_url').notNullable().defaultsTo('https://vignette.wikia.nocookie.net/hayday/images/c/c5/Small_Mystery_Package.png/revision/latest?cb=20150714100708')
        table.text('description').notNullable().defaultsTo('This is my favorite item that I am giving away.')
        table.timestamps(true, true)
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};