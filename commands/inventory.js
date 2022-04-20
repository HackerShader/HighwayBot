const { Vec3 } = require("vec3");
const math = require('mathjs');
module.exports = {
    name: 'inventory',
    async execute(bot, message, args, username) {
        let count = 0;
        for (let i = 0; i < bot.inventory.slots.length; i++) {
            if (!bot.inventory.slots[i]) {
                continue;
            } else if (bot.inventory.slots[i].name === 'netherrack') {
                count += bot.inventory.slots[i].count;
            }
        }
        console.log(`${count} netherrack in inventory`);

        if (args[0] == `drop`) {
            for (let i = 0; i < bot.inventory.slots.length; i++) {
                if (!bot.inventory.slots[i]) {
                    continue;
                } else {
                    try {
                        await bot.toss(87, null, (count - 64));

                        break;
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
        if (args[0] == `dub`) {
            let pickaxecount = 0;
            for (let i = 0; i < bot.inventory.slots.length; i++) {
                if (!bot.inventory.slots[i]) {
                    continue;
                } else if (bot.inventory.slots[i].name === 'diamond_pickaxe') {
                    if(bot.inventory.slots[i].durabilityUsed >= 1400) {
                        console.log(bot.inventory.slots[i])
                        console.log('need to repair pickaxe ' + bot.inventory.slots[i].durabilityUsed);
                        continue;
                    } else {
                        bot.equip(bot.inventory.slots[i], 'hand');
                        console.log(bot.inventory.slots[i].durabilityUsed)
                        pickaxecount += bot.inventory.slots[i].count;
                    }
                }
            }
        }
    }
}
