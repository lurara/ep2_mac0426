
import driver from 'bigchaindb-driver'
import base58 from 'bs58'
import crypto from 'crypto'

import { Ed25519Sha256 } from 'crypto-conditions'

const API_PATH = 'http://localhost:9984/api/v1/'

export function postItem(user, item) {

    const tx = driver.Transaction.makeCreateTransaction(
        item,
    
        {info: item},
    
        [
            driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(user.key.publicKey)
            )
        ],
        user.key.publicKey
    )

    const txSigned = driver.Transaction.signTransaction(tx, user.key.privateKey)

    const conn = new driver.Connection(API_PATH)

    conn.postTransactionCommit(txSigned).then(
        retrievedTx => {
            console.log('Transaction', retrievedTx.id, 'successfully posted.')
        }
    )

}



