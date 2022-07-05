module.exports = (bot) => {
    let count = 0;
    let PickaxeSlots = 0;
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== 'diamond_pickaxe') continue;
        if (bot.inventory.slots[i].durabilityUsed >= 1400) {
            console.log(`${i} need to repair pickaxe: ${bot.inventory.slots[i].durabilityUsed}`);
            continue;
        }

        PickaxeSlots = i;
        console.log(`${i} | ${bot.inventory.slots[i].durabilityUsed}`);
        count += bot.inventory.slots[i].count;
    }
    console.log(PickaxeSlots);
    let checkPickaxe = bot.inventory.slots[PickaxeSlots];
    if(checkPickaxe && checkPickaxe !== 0) bot.equip(checkPickaxe, 'hand');
    else console.log('Thinking... I didn\'t have any pickaxe');
};
