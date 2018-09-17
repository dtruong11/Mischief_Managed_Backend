exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('organizations').del()
  await knex('events').del()
  await knex('users_events').del()
  await knex('reviews').del()
  await knex('posts').del()
  await knex('replies').del()
  await knex('free_items').del()
};