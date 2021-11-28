
import prompt from 'prompt'
import createItem from "./src/items/create.js"


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

console.log("Available choices: (e)xit, (c)reate item, (l)ist items, (n)eagotiate item")



let choice  = (await prompt.get(schema)).question

while (choice != 'e'){

    if (choice == 'c'){
        let item = await createItem()
        console.log(item)

    } else if (choice == 'n'){


    } else if (choice == 'l') {

    }

    choice  = (await prompt.get(schema)).question

}

console.log("Thank you for using this prototype!")


