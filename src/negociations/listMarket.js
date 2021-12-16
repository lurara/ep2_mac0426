
import driver from 'bigchaindb-driver'
import fetch from 'node-fetch'
import prompt from "prompt";

const API_PATH = 'http://localhost:9984/api/v1/'
const conn = new driver.Connection(API_PATH)

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]'
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

export async function queryMarket(user, interactive){
    let schema = {
        properties: {
            id: {
                pattern: /[A-z0-9]+/,
                message: "Input the id of the item you want",
                required: true,
            },
        },
    }

    try{
        let data = await fetch(`http://localhost:9984/api/v1/assets/?search=true`).then((response) => {
            return response.json()
        })

        if (interactive){
            console.log("Items for sale:")
            console.log(data)
        }
        if (data.length == 0){
            return
        }
        let id
        if (interactive){
            id = (await prompt.get(schema)).id
        } else {
            id = data[random(0, data.length)].id
        }
        data = await fetch(`http://localhost:9984/api/v1/assets/?search=${id}`).then((response) => {
            return response.json()
        })
        const item = data[0]

        let meta = await conn.listTransactions(id)

        //console.log(item.data.owner.key.publicKey);
        data = await fetch(`http://localhost:9984/api/v1/outputs?public_key=${meta[meta.length - 1].metadata.owner.key.publicKey}`).then((response) => {
            return response.json()
        })
        const transaction = data[0]
        
        let txCreated = await conn.getTransaction(transaction.transaction_id)
        //console.log(txCreated)
        let previousOwner = txCreated.metadata.owner
        txCreated.metadata.owner = user
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
                txCreated.metadata
        )
        
        const signedTranfer = driver.Transaction.signTransaction(transfer, previousOwner.key.privateKey)
        //console.log(signedTranfer)
        try{
            let retrievedTx = await conn.postTransactionCommit(signedTranfer)
        }
        catch (e){
            console.log(e)
        }
    }
    catch(e){
        console.log(e)
    }
    
    

    //console.log('Transaction', retrievedTx.id, 'successfully posted.')
}