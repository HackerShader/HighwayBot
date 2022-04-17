const {Vec3} = require("vec3");
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

        if(args[0] == `drop`) {
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
        if(args[0] == `echest`) {



            let pos = new Vec3(bot.entity.position.x, bot.entity.position.y, bot.entity.position.z);
            let block = bot.blockAt(pos.offset(-1, 0, 0));
            if (block.name === 'air') {
                try {
                    await bot.placeBlock(block, new Vec3(1, 0, 0));
                } catch (err) {
                    console.log(err)
                }
            }

        }
    }
}
