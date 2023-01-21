const config = require(`../../config/${require('../../settings.json').config}`);
module.exports = async (bot) => {
    bot.chat(`/msg ${config.general.owner} [Highway] Digging tasks started`);
    await require('./interaction/place')(bot);
    await require('./interaction/break')(bot)
};