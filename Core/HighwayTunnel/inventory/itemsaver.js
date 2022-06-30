const mineflayer = require('mineflayer')

/**
 * Giữ các item khỏi việc bị mất
 * @param {mineflayer.Bot} bot 
 */
module.exports = (bot) => {
    let count = 0;
    let temp = new Number;
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== 'diamond_pickaxe') continue;
        if (bot.inventory.slots[i].durabilityUsed >= 1400) {
            console.log(`${i} need to repair pickaxe: ${bot.inventory.slots[i].durabilityUsed}`);
            continue;
        }
        temp = i
        console.log(`${i} | ${bot.inventory.slots[i].durabilityUsed}`);
        count += bot.inventory.slots[i].count;
    }
    console.log(temp)
    bot.equip(bot.inventory.slots[temp], 'hand')
}
