module.exports = async (bot) => {
    let blockSlots = 0;
    let block = 'netherrack';
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== block) continue;
        blockSlots = i;
    }
    console.log(blockSlots);
    let hasBlock = bot.inventory.slots[blockSlots];
    if(hasBlock) bot.equip(hasBlock, 'hand');
};