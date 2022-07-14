const config = require(`../../config/${require('../../path.json').config}`);
module.exports = async (bot) => {
    bot.chat(`/msg ${config.username} [Highway] Digging tasks started`);
    await require('./break/mine')(bot);
};