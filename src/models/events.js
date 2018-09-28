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

const getFiltered = (query) => {
    let allEvents = joinTbs()

    // // step 2: cost filter 
    if (query.cost === '0') {
        allEvents = allEvents.where('cost', 0)
    }

    // step 3: filter boolean values (sport, art, educational, mmusic, nature)
    const input = { ...query }
    delete input.lat
    delete input.long
    delete input.cost
    delete input.min_age
    delete input.max_age

    for (key in input) {
        allEvents = allEvents.andWhere(key, true)
    }

    if (query.min_age && query.max_age) {
        const min_user_age = parseInt(query.min_age)
        const max_user_age = parseInt(query.max_age)
        allEvents = allEvents
            .andWhere('min_age', '<=', min_user_age).andWhere('max_age', '>=', max_user_age)
            .orWhere('max_age', '<=', max_user_age).andWhere('min_age', '>=', min_user_age)
    }

    console.log(allEvents.toString())
    // step 4: filter by morning, afternoon, evening 

    // step 5: filter based on location 
    const nearbyEvents = allEvents.returning('*').then(events => {
        // console.log('events before filtering location', events)
        // return events.filter(event => {
        //     const distance = getDistance({ lat: event.lat, long: event.long }, { lat: parseFloat(query.lat), long: parseFloat(query.long) })
        //     console.log('distance', distance)
        //     if (distance < 20) return true
        // })

        return events
    })



    return nearbyEvents

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