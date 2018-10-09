const knex = require('../db/knex')

function getFeatured(table) {
    return knex(table)
        .then(table => {
            const ids = generateRandomIds(table)
            return [table[ids[0]], table[ids[1]], table[ids[2]], table[ids[3]]]
        })
}

const generateRandomIds = (tableArr) => {
    let limit = tableArr.length 
    let arr = []
    while (arr.length < 4) {
      let randomnumber = Math.floor(Math.random() * limit);
      if (arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr 
  }

module.exports = {
    getFeatured
}