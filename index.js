
import prompt from 'prompt'
import createItem from "./src/items/create.js"
import { postItem } from './src/negociations/transaction.js'
import { queryOwner } from './src/negociations/queries.js'
import { queryMarket } from "./src/negociations/listMarket.js";
import driver from 'bigchaindb-driver'


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

console.log("type your name")

let name = (await prompt.get(["name"])).question


const user = {
    name: name,
    key: new driver.Ed25519Keypair()
}

console.log("Select your choice")

console.log("Available choices: (e)xit, (c)reate item, (l)ist items, (n)egotiate item")



let choice  = (await prompt.get(schema)).question

while (choice != 'e'){

    if (choice == 'c'){
        let item = await createItem(user)
        console.log(item)
        await postItem(user, item)

    } else if (choice == 'n'){
        let listMarket = await queryMarket(user, true);

    } else if (choice == 'l') {
        let itensOwner = queryOwner(user, true)
        console.log("This is the items you have:")
        let result = await itensOwner
        console.log(result)
        result.forEach(element => {
            console.log(element.metadata)
        })
    }

    choice  = (await prompt.get(schema)).question

}

console.log("Thank you for using this prototype!")


