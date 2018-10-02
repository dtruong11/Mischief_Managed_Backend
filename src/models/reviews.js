const db = require('../db/knex')
const tableName = 'reviews'
const getAll = (eventId) => {
  return db(tableName)
    .join('users', 'users.id', '=', 'reviews.user_id')
    .where({ event_id: eventId })
    .returning('*')
    .then(res => res)
}


const getOne = (eventId, reviewId) => {
  return db(tableName)
    .join('users', 'users.id', '=', 'reviews.user_id')
    .whereRaw('reviews.id = ?', [reviewId])
    .andWhere({ event_id: eventId })
    .first()
}

const postReview = (eventId, user_id, { content, votes }) => {
  console.log('this is eventId', eventId, typeof (eventId))
  const bodyInsert = {
    user_id,
    event_id: eventId,
    content,
    votes
  }
  return db(tableName)
    .insert(bodyInsert)
    .returning('*')
    .then(([res]) => res)



}

module.exports = {
  getAll,
  getOne,
  postReview
}

// ['first_name', 'last_name', 'city', 'state', 'content', 'votes', 'user_id', 'event_id', 'created_at', 'updated_at']