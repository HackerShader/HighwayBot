const fs = require('fs-extra');
fs.readdirSync('Core');
fs.writeFileSync('Core/HighwayTunnel/inventory/itemsaver.js',
    'module.exports = (bot) => {\n' +
    '    let count = 0;\n' +
    '    let concu = Number;\n' +
    '    for (let i = 0; i < bot.inventory.slots.length; i++) {\n' +
    '        if (!bot.inventory.slots[i]) continue;\n' +
    '        if (bot.inventory.slots[i].name !== \'diamond_pickaxe\') continue;\n' +
    '        if (bot.inventory.slots[i].durabilityUsed >= 1400) {\n' +
    '            console.log(`${i} need to repair pickaxe: ${bot.inventory.slots[i].durabilityUsed}`);\n' +
    '            continue;\n' +
    '        }\n' +
    '        concu = i\n' +
    '        console.log(`${i} | ${bot.inventory.slots[i].durabilityUsed}`);\n' +
    '        count += bot.inventory.slots[i].count;\n' +
    '    }\n' +
    '    console.log(concu)\n' +
    '    bot.equip(bot.inventory.slots[concu], \'hand\')\n' +
    '}\n'
);