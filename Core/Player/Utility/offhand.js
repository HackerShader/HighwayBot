module.exports = async (bot) => {
    setInterval(() => {
        let totem_count = 0;
        for (let i = 0; i < bot.inventory.slots.length; i++) {
            if (!bot.inventory.slots[i]) continue;
            if (bot.inventory.slots[i].name !== `totem_of_undying`) continue;
            totem_count = i;
        }
        bot.equip(bot.inventory.slots[totem_count], 'off-hand');
    }, 200);
};