const mineflayer = require('mineflayer')

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = async (bot) => {
    setInterval(() => {
        let totem_count = 0;
        for (let i = 0; i < bot.inventory.slots.length; i++) {
            if (!bot.inventory.slots[i]) continue;
            if (bot.inventory.slots[i].name !== `totem_of_undying`) continue;
            else totem_count = i;
        }
        if (totem_count != 0) bot.equip(bot.inventory.slots[totem_count], 'off-hand').catch((e) => {
            console.log(e)
        });
    }, 200);
};