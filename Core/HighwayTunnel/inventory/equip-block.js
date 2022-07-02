module.exports = async (bot) => {
    let NetherrackSlots = 0;
    for (let i = 0; i < bot.inventory.slots.length; i++) {
        if (!bot.inventory.slots[i]) continue;
        if (bot.inventory.slots[i].name !== 'netherrack') continue;
        NetherrackSlots = i
    }
    console.log(NetherrackSlots)
    bot.equip(bot.inventory.slots[NetherrackSlots], 'hand')
}