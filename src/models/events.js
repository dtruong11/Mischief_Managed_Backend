const db = require('../db/knex')
const tableName = 'events'

const joinTbs = () => {
    return db(tableName)
        .join('organizations', 'organizations.id', '=', 'events.org_id')
}
const getAll = () => {
    return joinTbs()
        .returning('*')
        .then(res => res)
}

const getOne = (eventId) => {
    return joinTbs()
        .where({ id: eventId })
        .first()
}

const getFiltered = (lat, long, sport, arts, educational, nature, music, morning, afternoon, evening ) => {
    // getAll with all the filtered events

    // calculate the distance. return results 

}

const getDistance = (a,b) => {
    const R = 3959 // miles
    const φ1 = a.lat * (Math.PI / 180)
    const φ2 = b.lat * (Math.PI / 180)
    const Δφ = φ2 - φ1
    const Δλ = (b.lng-a.lng)* (Math.PI / 180)
    const α = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1-α))
    const d = R * c
    return d
  }
  

module.exports = {
    getAll,
    getOne
}