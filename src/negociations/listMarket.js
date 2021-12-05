
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
    
    let txCreated = await conn.getTransaction(transaction.transaction_id)
    console.log(txCreated)
    //txCreated.asset.data.owner = user
    const transfer = driver.Transaction.makeTransferTransaction(
        [{
            tx: txCreated,
            output_index: transaction.output_index
        }],
        [
            driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(user.key.publicKey)
            ),
        ],
        {
            info: txCreated.metadata
        }
    )
    
    const signedTranfer = driver.Transaction.signTransaction(transfer, item.data.owner.key.privateKey)
    console.log(signedTranfer)
    conn.postTransactionCommit(signedTranfer).then(
        retrievedTx => {
            console.log('Transaction', retrievedTx.id, 'successfully posted.')
        }
    )
}