
import driver from 'bigchaindb-driver'
import fetch from 'node-fetch'
import prompt from "prompt";

const API_PATH = 'http://localhost:9984/api/v1/'
const conn = new driver.Connection(API_PATH)

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]'
}




export async function queryMarket(user){
    let schema = {
      properties: {
        id: {
          pattern: /[A-z0-9]+/,
          message: "Input the id of the item you want",
          required: true,
        },
      },
    };

    let data = await fetch(`http://localhost:9984/api/v1/assets/?search=true`).then((response) => {
        return response.json()
    })

    console.log("Items for sale:")
    console.log(data)
    const { id } = await prompt.get(schema);
    data = await fetch(`http://localhost:9984/api/v1/assets/?search=${id}`).then((response) => {
        return response.json()
    })
    const item = data[0]

    console.log(item.data.owner.key.publicKey);
    data = await fetch(`http://localhost:9984/api/v1/outputs?public_key=${item.data.owner.key.publicKey}`).then((response) => {
        return response.json()
    })
    const transaction = data[0]
    console.log(transaction)
    const transfer = driver.Transaction.makeTransferTransaction(
      [transaction],
      [
        driver.Transaction.makeOutput(
          driver.Transaction.makeEd25519Condition(user.key.publicKey)
        ),
      ]
    );
}