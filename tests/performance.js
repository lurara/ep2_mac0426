
import { postItem } from '../src/negociations/transaction.js'
import { queryOwner } from '../src/negociations/queries.js'
import { queryMarket } from "../src/negociations/listMarket.js";
import driver from 'bigchaindb-driver'

let measurements = 10
let users = 100
let step = 100

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

let manyUsers = []

while (users > 0) {
    manyUsers.push({
        name: "shururururu",
        key: new driver.Ed25519Keypair()
    })
    users -= 1
}



let item = {
    name: 'fdff',
    forSale: 'true',
    price: '4343',
    equipable: false,
    restoreLife: '324',
    restoreMana: '324',
    increaseAttack: '3',
    increaseDefence: '3',
}

let timePerformancesPostItem = []
let timePerformancesQueryItem = []
let timePerformancesNegotiateItem = []

let start
let end

// Measure post speed

/* for (let i = 0; i < measurements; i++){
    
    let promisses = []
    start = Date.now()
    for (let j = 0; j < step; j++) {
        let randUser = manyUsers[random(0, manyUsers.length)]
        let randItem = item
        randItem.doing = "post"
        randItem.series = i
        randItem.big_series = j
        randItem.owner = randUser
        promisses.push(postItem(randUser, randItem))
    
    }
    await Promise.all(promisses)
    
    timePerformancesPostItem.push(Date.now() - start)
}

console.log(timePerformancesPostItem) */


// Measure list performance

for (let i = 0; i < measurements; i++){
    
    let promisses = []
    start = Date.now()
    for (let j = 0; j < step; j++) {
        let randUser = manyUsers[random(0, manyUsers.length)]
        
        promisses.push(queryOwner(randUser, false))
    
    }
    await Promise.all(promisses)
    
    timePerformancesQueryItem.push(Date.now() - start)
}

console.log(timePerformancesQueryItem)

// Measure negotiate performacnce

/* for (let i = 0; i < measurements; i++){
    
    let promisses = []
    start = Date.now()
    for (let j = 0; j < step; j++) {
        let randUser = manyUsers[random(0, manyUsers.length)]
        
        promisses.push(queryMarket(randUser, false))
    
    }
    await Promise.all(promisses)
    
    timePerformancesNegotiateItem.push(Date.now() - start)
}

console.log(timePerformancesNegotiateItem) */