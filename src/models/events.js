const db = require('../db/knex')
const tableName = 'events'
var moment = require('moment');
const modelReview = require('./reviews')
const joinTbs = () => {
  return db(tableName)
    .select('events.id AS event_id', '*')
    .join('organizations', 'organizations.id', '=', 'events.org_id')
}

const getAll = () => {
  return joinTbs()
  // .then(res => res)
}


const getOne = (eventId) => {
  return joinTbs()
    .where('events.id', eventId )
    .first()
    .then(async (event) => {
      try {
        const reviews = await modelReview.getAll(event.event_id)
        event.reviews = reviews
        return event
      } catch (e) {
        console.error(e)
      }
    })
}

const getFiltered = async (query) => {
  let allEvents = joinTbs()

  // step 2: cost filter 
  if (query.cost) {
    allEvents = allEvents.where('cost', 0)
  }

  // delete query params in input to filter category 
  const input = { ...query }
  delete input.lat
  delete input.long
  if (input.cost) delete input.cost
  if (input.min_age) delete input.min_age
  if (input.max_age) delete input.max_age
  if (input.range) delete input.range

  if (input.morning) delete input.morning
  if (input.afternoon) delete input.afternoon
  if (input.evening) delete input.evening

  // step 3: filter boolean values (sport, art, educational, music, nature)
  for (key in input) {
    if (key) allEvents = allEvents.andWhere(key, true)
  }

  // step 4: filter by age
  let filteredEvents = await allEvents.returning('*').then(res => res) //reset filteredEvents through every filtering level 
  filteredEvents = filterByAge(filteredEvents, query)

  // step 5: filter by morning, afternoon, evening 
  filteredEvents = filterByTimeOfDay(filteredEvents, query)

  // step 5: filter based on location 
  return filterByLocation(filteredEvents, query)
}

//////////////////////////////////////
// helper functions 
/////////////////////////////////////

const filterByAge = (filteredEvents, query) => {
  if (query.min_age && query.max_age) {
    const min_user_age = parseInt(query.min_age)
    const max_user_age = parseInt(query.max_age)

    console.log('User age request', min_user_age, max_user_age)
    filteredEvents = filteredEvents.filter(event => {
      console.log('Event age in db', event.min_age, event.max_age)
      if (min_user_age > event.max_age) {
        console.log('edge case: much older than the event')
        return false
      }
      else if (max_user_age < event.min_age) {
        console.log('edge case: much younger than the event')
        return false
      }
      else {
        console.log('except for edge case should work')
        return true
      }
      // if (event.min_age <= min_user_age && event.max_age >= max_user_age) return true
      // else if (event.max_age <= max_user_age && event.min_age >= min_user_age) return true
      // else return false
    })
    console.log('LENGTH of filteredEvents', filteredEvents.length)
  }
  return filteredEvents
}


const filterByTimeOfDay = (filteredEvents, query) => {
  // console.log('moment', moment('2018-09-16T15:00:00-07:00').format("YYYY-MM-DD HH:mm:ss a"))
  // console.log('moment', moment('2018-09-16T15:00:00-07:00').format("HH"))
  let input = { ...query }
  delete input.lat
  delete input.long
  if (input.cost) delete input.cost
  if (input.min_age) delete input.min_age
  if (input.max_age) delete input.max_age
  if (input.range) delete input.range
  if (input.cost) delete input.cost
  if (input.educational) delete input.educational
  if (input.nature) delete input.nature
  if (input.art) delete input.art
  if (input.music) delete input.music
  if (input.sport) delete input.sport

  if (query.morning || query.afternoon || query.evening) {
    filteredEvents = filteredEvents.filter(event => {
      let arr = [getAMPM(event.start_date), getAMPM(event.end_date)]
      console.log('Look at arr', arr)
      for (let key in input) {
        if (arr.includes(key)) return true
      }
    })
  }
  return filteredEvents
}


const filterByLocation = (events, query) => {
  return events.filter(event => {
    const distance = getDistance({ lat: event.lat, long: event.long }, { lat: parseFloat(query.lat), long: parseFloat(query.long) })
    console.log('distance', distance)

    if (query.range) {
      console.log(`range ${query.range} does exists`)
    }

    const range = query.range ? query.range : 20
    if (distance < range) return true
  })
}
const getAMPM = (str) => {
  // console.log('str inside getAMPM', str)
  let split_afternoon = 12
  let split_evening = 17
  let hour = moment(str).format("HH")

  if (hour > split_afternoon && hour <= split_evening) {
    return 'afternoon'
  } else if (hour >= split_evening) {
    return 'evening'
  } else {
    return 'morning'
  }
}

const getDistance = (a, b) => {
  const R = 3959 // miles
  const φ1 = a.lat * (Math.PI / 180)
  const φ2 = b.lat * (Math.PI / 180)
  const Δφ = φ2 - φ1
  const Δλ = (b.long - a.long) * (Math.PI / 180)
  const α = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1 - α))
  const d = R * c
  return d
}


module.exports = {
  getAll,
  getOne,
  getFiltered
}