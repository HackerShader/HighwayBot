const fs = require('fs');
fs.readdirSync('commands')
fs.writeFileSync('commands/inventory.js', 'module.exports = {\n' +
    '    name: \'inventory\',\n' +
    '    async execute(bot, message, args) {\n' +
    '        let count = 0;\n' +
    '        for (let i = 0; i < bot.inventory.slots.length; i++) {\n' +
    '            if (!bot.inventory.slots[i]) continue;\n' +
    '            if (bot.inventory.slots[i].name !== \'netherrack\') continue;\n' +
    '            count += bot.inventory.slots[i].count;\n' +
    '        }\n' +
    '        console.log(`${count} netherrack in inventory`);\n' +
    '\n' +
    '        if (args[0] === `drop`) {\n' +
    '            for (let i = 0; i < bot.inventory.slots.length; i++) {\n' +
    '                if (!bot.inventory.slots[i]) continue;\n' +
    '                try {\n' +
    '                    await bot.toss(87, null, (count - 64));\n' +
    '                    break;\n' +
    '                } catch (err) {\n' +
    '                    console.log(err);\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '        if (args[0] === `dub`) {\n' +
    '            let pickaxecount = 0;\n' +
    '            for (let i = 0; i < bot.inventory.slots.length; i++) {\n' +
    '                if (!bot.inventory.slots[i]) continue;\n' +
    '                if (bot.inventory.slots[i].name !== \'diamond_pickaxe\') continue;\n' +
    '                if (bot.inventory.slots[i].durabilityUsed >= 1400) {\n' +
    '                    console.log(`${i} need to repair pickaxe: ${bot.inventory.slots[i].durabilityUsed}`);\n' +
    '                    continue;\n' +
    '                }\n' +
    '                bot.equip(bot.inventory.slots[i], \'hand\');\n' +
    '                console.log(`${i} | ${bot.inventory.slots[i].durabilityUsed}`);\n' +
    '                pickaxecount += bot.inventory.slots[i].count;\n' +
    '            }\n' +
    '        }\n' +
    '    }\n' +
    '}');

