const table = 'replies'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.integer('post_id').notNullable().defaultsTo(0)
        table.foreign('post_id').references('posts.id').onDelete('CASCADE')
        table.text('content').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};