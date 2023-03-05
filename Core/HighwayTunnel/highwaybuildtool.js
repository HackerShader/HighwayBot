const config = require(`../../config/${require('../../settings.json').config}`);
module.exports = async (bot) => {
    bot.chat(`/msg ${config.general.owner} [Highway] Digging tasks started`);
    async function tasks() {
        const blockrequire = await require('./check/targetblock')(bot)
        if (blockrequire.breakblock.length === 0 && blockrequire.placeblock.length === 0) {
            await bot.navigate.to(bot.entity.position.offset(2, 0, 0))
            return;
        }
        await require('./interaction/place')(bot)
            .then(function () {
                require('./interaction/break')(bot)
            }).then(function () {
                tasks()
            })
    }
    await tasks()
}