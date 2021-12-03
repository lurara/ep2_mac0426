
import prompt from 'prompt'
import createItem from "./src/items/create.js"
import { postItem } from './src/negociations/transaction.js'
import { queryOwner } from './src/negociations/queries.js'
import { queryMarket } from "./src/negociations/listMarket.js";
import driver from 'bigchaindb-driver'

const user = {
    name: "Matheus",
    key: new driver.Ed25519Keypair()
}

let schema = {
    properpeties:{
        choice: {
            pattern: /e|c|n/,
            message: 'Choose one of the available choices',
            required: true
        }
    }
}


prompt.start()

console.log("Select your choice")

console.log("Available choices: (e)xit, (c)reate item, (l)ist items, (n)egotiate item")



let choice  = (await prompt.get(schema)).question

while (choice != 'e'){

    if (choice == 'c'){
        let item = await createItem(user)
        console.log(item)
        postItem(user, item)

    } else if (choice == 'n'){
        let listMarket = await queryMarket(user);

    } else if (choice == 'l') {
        let itensOwner = queryOwner(user)
        console.log("This is the items you have:")
        let result = await itensOwner
        result.forEach(element => {
            console.log(element.asset.data)
        })
    }

    choice  = (await prompt.get(schema)).question

}

console.log("Thank you for using this prototype!")


