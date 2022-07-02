module.exports = {
    name: 'inventory',
    async execute(bot, message, args) {
        let count = 0;
        for (let i = 0; i < bot.inventory.slots.length; i++) {
            if (!bot.inventory.slots[i]) continue;
            if (bot.inventory.slots[i].name !== `netherrack`) continue;
            count += bot.inventory.slots[i].count;
        }
        console.log(`${count} netherrack items in inventory`);

        if (args[1] === `drop`) {
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
        if (args[1] === `net`) {

        }
    }
};
