
import driver from 'bigchaindb-driver'
import base58 from 'bs58'
import crypto from 'crypto'

import { Ed25519Sha256 } from 'crypto-conditions'


/* 
const API_PATH = 'http://localhost:9984/api/v1/'
const alice = new driver.Ed25519Keypair()

const tx = driver.Transaction.makeCreateTransaction(
    {city: 'São Paulo, BR', temperature: 24, datetime: new Date().toString() },

    {what: "Alguma coisa"},

    [
        driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey)
        )
    ],
    alice.publicKey
)

const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

const conn = new driver.Connection(API_PATH)

conn.postTransactionCommit(txSigned).then(
    retrievedTx => {
        console.log('Transaction', retrievedTx.id, 'successfully posted.')
    }
) */

