
import prompt from 'prompt'

export default async function createItem() {
    let emptyObject = {}

    let schema = {
        properties: {
            name: {
                pattern: /[A-z0-9]+/,
                message: 'Input the name of the item',
                required: true
            },
            equipable: {
                pattern: /true|false/,
                message: 'Input "false" for non equipable item and "true" for equipable item',
                required: true
            }
        }
    }

    let schemaStatusEquipable = {
        properties: {
            magic : {
                pattern: /[0-9]+/,
                message: 'Input the amount of magic power of the item',
                required: true
            },
            defence : {
                pattern: /[0-9]+/,
                message: 'Input the amount of defence of the item',
                required: true
            },
            attack : {
                pattern: /[0-9]+/,
                message: 'Input the amount of attack of the item',
                required: true
            },
            agility: {
                pattern: /[0-9]+/,
                message: 'Input the amount of agility of the item',
                required: true
            }
        }
    }

    let schemaStatusUsable = {
        properties: {
            restoreLife : {
                pattern: /[0-9]+/,
                message: 'Input the amount of life restored uppon use',
                required: true
            },
            restoreMana : {
                pattern: /[0-9]+/,
                message: 'Input the amount of mana restored uppon use',
                required: true
            },
            increaseAttack : {
                pattern: /[0-9]+/,
                message: 'Input the amount of time the attack is increased',
                required: true
            },
            increaseDefence: {
                pattern: /[0-9]+/,
                message: 'Input the amount of time  the defence is increased',
                required: true
            }
        }
    }

    console.log(emptyObject)

    prompt.start()

    const {name, equipable} = await prompt.get(schema)
    emptyObject.name = name
    if (equipable === "true"){
        emptyObject.equipable = true

        const {magic, defence, attack, agility} = await prompt.get(schemaStatusEquipable)
        emptyObject.magic = magic
        emptyObject.defence = defence
        emptyObject.attack = attack
        emptyObject.agility = agility
    
    } else {
        emptyObject.equipable = false
        const {restoreLife, restoreMana, increaseAttack, increaseDefence} = await prompt.get(schemaStatusUsable)
        emptyObject.restoreLife = restoreLife
        emptyObject.restoreMana = restoreMana
        emptyObject.increaseAttack = increaseAttack
        emptyObject.increaseDefence = increaseDefence
    }

    return emptyObject

    



}