const db = require('../db/knex')
const tableName = 'reviews'
const modelUser = require('./users')
const getAll = (eventId) => {
  return db(tableName)
    .select('reviews.id AS review_id', '*')
    .join('users', 'users.id', '=', 'reviews.user_id')
    .where({ event_id: eventId })
    .then(res => {
      // console.log(res)
      let result = []
      console.log('THIS IS res', res)
      res.map(el => {
        const { review_id, user_id, event_id, content, votes, created_at, updated_at, first_name, last_name, city, state, avatar } = el
        const obj = { review_id, user_id, event_id, content, votes, created_at, updated_at, first_name, last_name, city, state, avatar }
        result.push(obj)
      })
      return result
    })
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
    .join('users', 'users.id', '=', 'reviews.user_id')
    .returning(['id AS review_id', ' user_id', 'event_id', 'content', 'votes', 'created_at', 'updated_at'])
    .then(async ([res]) => {
      const user = await modelUser.getOne(res.user_id)
      const { first_name, last_name, city, state, avatar } = user[0]
      let result = { ...res, first_name, last_name, city, state, avatar }
      return result
    })
}

module.exports = {
  getAll,
  getOne,
  postReview
}

// ['first_name', 'last_name', 'city', 'state', 'content', 'votes', 'user_id', 'event_id', 'created_at', 'updated_at']