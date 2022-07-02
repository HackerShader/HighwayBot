const fs = require('fs-extra');
fs.readdirSync('commands');
fs.writeFileSync('commands/inventory.js',
    'module.exports = {\n' +
    '    name: \'inventory\',\n' +
    '    async execute(bot, message, args) {\n' +
    '        let count = 0;\n' +
    '        for (let i = 0; i < bot.inventory.slots.length; i++) {\n' +
    '            if (!bot.inventory.slots[i]) continue;\n' +
    '            if (bot.inventory.slots[i].name !== `netherrack`) continue;\n' +
    '            count += bot.inventory.slots[i].count;\n' +
    '        }\n' +
    '        console.log(`${count} netherrack items in inventory`);\n' +
    '        \n' +
    '        if (args[1] === `drop`) {\n' +
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
    '        if (args[1] === `equip`) {\n' +
    '\n' +
    '        }\n' +
    '    }\n' +
    '}\n'
);