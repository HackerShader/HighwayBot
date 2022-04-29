
module.exports = {
    name: 'inventory',
    async execute(bot, message, args) {
        let count = 0;
        for (let i = 0; i < bot.inventory.slots.length; i++) {
            if (!bot.inventory.slots[i]) continue;
            if (bot.inventory.slots[i].name !== 'netherrack') continue;
            count += bot.inventory.slots[i].count;
        }
        console.log(`${count} netherrack in inventory`);

        if (args[0] === `drop`) {
            for (let i = 0; i < bot.inventory.slots.length; i++) {
                if (!bot.inventory.slots[i]) continue;
                try {
                    await bot.toss(87, null, (count - 64));
                    break;
                } catch (err) {
                    console.log(err);
                }
            }
        }
        if (args[0] === `dub`) {
            let pickaxecount = 0;
            for (let i = 0; i < bot.inventory.slots.length; i++) {
                if (!bot.inventory.slots[i]) continue;
                if (bot.inventory.slots[i].name !== 'diamond_pickaxe') continue;
                if (bot.inventory.slots[i].durabilityUsed >= 1400) {
                    console.log(`${i} need to repair pickaxe: ${bot.inventory.slots[i].durabilityUsed}`);
                    continue;
                }
                bot.equip(bot.inventory.slots[i], 'hand');
                console.log(`${i} | ${bot.inventory.slots[i].durabilityUsed}`);
                pickaxecount += bot.inventory.slots[i].count;
            }
        }
    }
}
