const mineflayer = require('mineflayer');
const editJsonFile = require("edit-json-file");
/**
 *
 * @param {mineflayer.Bot} bot
 */
module.exports = (bot) => {
    let count = 0;
    let PickaxeSlots = 0;
    const edit = editJsonFile('./Core/console/status.json');
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== 'diamond_pickaxe') continue;
        if (bot.inventory.slots[i].durabilityUsed >= 1400) {
            edit.set(`PickaxeBroken${i.toString()}`, {
                slot: PickaxeSlots,
                durability: bot.inventory.slots[i].durabilityUsed
            });
            edit.save();
            continue;
        }

        PickaxeSlots = i;
        count += bot.inventory.slots[i].count;
        edit.set(`Pickaxe${count()}`, {
            slot: count,
            durability: bot.inventory.slots[i].durabilityUsed
        });
        edit.save();
    }
    let checkPickaxe = bot.inventory.slots[PickaxeSlots];
    if (checkPickaxe && checkPickaxe !== 0) bot.equip(checkPickaxe, 'hand');
    else console.log('Thinking... I didn\'t have any pickaxe');
};
