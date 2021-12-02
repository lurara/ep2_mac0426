
import driver from 'bigchaindb-driver'
import fetch from 'node-fetch'

const API_PATH = 'http://localhost:9984/api/v1/'
const conn = new driver.Connection(API_PATH)

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]'
}

async function getSortedTransactions (assetId) {
    let metaData = {}
    let result = await conn.listTransactions(assetId)
    if (result.length <= 1){
        return result
    }
    const inputTransactions = []
    result.forEach((tx) => {
        for (let key in tx.metadata) {
            metaData[key] = tx.metadata[key]
        }
    })
    return metaData
}

async function retrieveTransaction(transaction_id) {
    let result = await conn.searchAssets(transaction_id)
    let data = {}
    data.asset = result[0]
    let metadata = await getSortedTransactions(transaction_id)
    if (isArray(metadata)){
        data.metadata = metadata[0].metadata
    } else {
        data.metadata = metadata
    }
    return data
}

export async function queryOwner(owner){

    let data = await fetch(`http://localhost:9984/api/v1/outputs?public_key=${owner.key.publicKey}`).then((response) => {
        return response.json()
    })
    let items = []

    for (let element of data){
       let item = await retrieveTransaction(element.transaction_id)
       
       items.push(item)
    }
    
    return items

}