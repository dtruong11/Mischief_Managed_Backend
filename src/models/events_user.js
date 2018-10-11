const db = require('../db/knex')
const tableName = 'users_events'

/////////////////////////////
// helpers function 
////////////////////////////

// find event 
const find = (userId, eventId) => {
  return db(tableName)
    .where({
      event_id: eventId,
      user_id: userId
    })
    .first()
}

// join table
const joinTbs = (tableName) => {
  return db(tableName)
    .join('events', 'events.id', '=', 'users_events.event_id')
    .join('organizations', 'organizations.id', '=', 'events.org_id')
}


/////////////////////////////
// events registration 
////////////////////////////

// A user registers for an event 
// => POST (populate) / PATCH users_events 
const registerEvent = async (userId, eventId, body) => {
  const eventFound = await find(userId, eventId)
  if (eventFound) {
    return db(tableName)
      .where({ id: eventFound.id })
      .update({
        registered: true,
        notes: body.notes
      })
      .returning('*')
      .then(async ([res]) => {
        let registration_id = res.id
        await populateAttendees(body.attendees, registration_id)
        return res
      })
      .catch(console.error)
  } else {
    return db(tableName)
      .insert({
        user_id: userId,
        event_id: eventId,
        favorite: false,
        registered: true,
        notes: body.notes
      })
      .returning('*')
      .then(async ([res]) => {
        let registration_id = res.id
        let attendees = await populateAttendees(body.attendees, registration_id)
        if (attendees.length > 0) {
          let children = attendees.map(el => {
            return el[0]
          })
          res.attendees = children
        }
        return res
      })
  }
}

// check if the attendess/ children aready exist : not double registering the same child 

const checkifKidAttended = (registration_id, name, age) => {
  return db('attendees')
    .where({
      registration_id,
      name: name,
      age: age
    }).first()
}

const populateAttendees = (attendeesArr, registration_id) => {
  console.log('attendeesArr', attendeesArr)

  const promises = attendeesArr.map(async (el) => {
    const kidFound = await checkifKidAttended(registration_id, el.name, el.age)
    console.log('kidFound', kidFound)
    if (!kidFound) {
      return db('attendees')
        .insert({
          registration_id,
          name: el.name,
          age: el.age
        })
        .returning('*')
    }
  })

  return Promise.all(promises) // this is a promise returning. .then, an array of result

}

const getRegisteredEvents = (userId) => {
  try {
    return joinTbs(tableName)
      .where({ registered: true, user_id: userId })
      .returning('*')
      .then(res => res)
  } catch (e) {
    console.error(e)
    Promise.reject(e)
  }
}

const getOneRegisteredEvent = (userId, eventId) => {
  return joinTbs(tableName)
    .where({ registered: true, user_id: userId, event_id: eventId })
    .first()
}

// Someone unregisters/ unlike an event = DELETE the event 
const unLikeEvent = (userId, eventId) => {
  return db(tableName)
    .where({ user_id: userId, event_id: eventId })
    .del()
    .returning('*')
    .then(([res]) => res)
}
/////////////////////////////
// favorite events  
////////////////////////////

const favorited = (eventId, userId) => {
  return db(tableName)
    .where({
      event_id: eventId,
      user_id: userId,
      favorite: true
    })
    .first()
}

// A user likes an event = POST & populate users_events 
const favEvent = async (userId, eventId) => {
  const found = await favorited(eventId, userId)
  if (!found) {
    const bodyInsert = {
      event_id: eventId,
      user_id: userId,
      favorite: true,
      registered: false
    }
    return joinTbs(tableName)
      .insert(bodyInsert)
      .returning('*')
      .then(([res]) => res)
  }
}

// A user unlikes an event = DELETE from users_events 


// Retrieve all favorite events = GET ALL 
const getFavorites = (userId) => {
  console.log("getFavorites", userId)
  return joinTbs(tableName)
    .where({ user_id: userId, favorite: true })
    .returning('*')
    .then(res => res)
}

module.exports = {
  registerEvent,
  unLikeEvent,
  getRegisteredEvents,
  getOneRegisteredEvent,
  getFavorites,
  favEvent
}