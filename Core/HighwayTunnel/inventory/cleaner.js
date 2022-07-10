const mineflayer = require('mineflayer');

/**
 *
 * @param {mineflayer.Bot} bot
 * @returns
 */
module.exports = async (bot) => {
    let count = 0;
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== `netherrack`) continue;
        count += bot.inventory.slots[i].count;
    }
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name === `netherrack`) try {
            await bot.look('90', '0.3', false);
            await bot.toss(87, null, (count - 128));
            break;
        } catch (err) {
            console.log(err);
        }
    }
};
