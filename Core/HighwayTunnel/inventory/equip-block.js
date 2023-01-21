module.exports = async (bot) => {
    let blockSlots = 0;
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== 'netherrack') continue;
        blockSlots = i;
    }
    console.log(blockSlots);
    let hasBlock = bot.inventory.slots[blockSlots];
    if (hasBlock) await bot.equip(hasBlock, 'hand');
};