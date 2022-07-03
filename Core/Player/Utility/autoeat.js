module.exports = async (bot) => {
    bot.autoEat.options.priority = "foodPoints";
    bot.autoEat.options.bannedFood = [''];
    bot.autoEat.options.eatingTimeout = 3;

    bot.on("health", async () => {
        if (bot.food >= 18) await bot.autoEat.disable();
        else {
            await bot.autoEat.enable();
            await bot.autoEat.eat(async function (err) {
                if (err) console.error(err);
            });
            await require('../../HighwayTunnel/inventory/itemsaver')(bot);
        }
    });
};