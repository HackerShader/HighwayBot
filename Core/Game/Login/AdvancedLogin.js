const config = require(`./config/${require('./../../../settings.json').config}`);
module.exports = (bot) => {
    bot.on('windowOpen', async (window) => {
        const pin = config.pin.split('');
        window.requiresConfirmation = false;
        await bot.clickWindow(pin[0], 0, 0);
        await bot.clickWindow(pin[1], 0, 0);
        await bot.clickWindow(pin[2], 0, 0);
        await bot.clickWindow(pin[3], 0, 0);

        setTimeout(() => {
            bot.chat('/2y2c');
        }, 5 * 1000);

        setTimeout(() => {
            bot.clickWindow(13, 0, 0);
        }, 6 * 1000);
    });
};