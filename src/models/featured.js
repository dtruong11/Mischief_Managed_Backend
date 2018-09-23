const knex = require('../db/knex')

function getFeatured(table) {
    return knex(table)
        .then(table => {
            console.log("I am a table array", table)
            const ids = generateRandomIds(table)
            console.log("I am ids",ids)
            return [table[ids[0]], table[ids[1]], table[ids[2]], table[ids[3]]]
        })
}

const generateRandomIds = (tableArr) => {
    console.log("I am inside generateRandomIds")
    let limit = tableArr.length 
    let arr = []
    while (arr.length < 4) {
      let randomnumber = Math.floor(Math.random() * limit);
      if (arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    console.log("I am the arr inside generateRandomIds", arr)
    return arr 
  }

module.exports = {
    getFeatured
}