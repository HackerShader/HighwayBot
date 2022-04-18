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
        if (args[0] == `echest`) {
            for (let x = -1; x <= 1; x++) {
                for (let z = -1; z <= 1; z++) {
                    if (math.abs(x) === math.abs(z)) {
                        continue;
                    }
                    const checkairblock = await bot.blockAt(bot.entity.position.offset(x, 0, z));
                    console.log(checkairblock.name)
                    if (checkairblock.name === 'air') {
                        try {
                            const target = bot.blockAt(bot.entity.position.offset(checkairblock.position.x, 0, checkairblock.position.z))
                            console.log(`trying to place echest at ${x}, ${z}`)
                            bot.equip(130, 'hand')
                            await bot.placeBlock(target, new Vec3(1, 0, 0));
                            break;
                        } catch (err) {
                            console.log(err)
                        }
                    }
                }
            }
        }
    }
}
