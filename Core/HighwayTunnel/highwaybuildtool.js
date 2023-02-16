const config = require(`../../config/${require('../../settings.json').config}`);
module.exports = async (bot) => {
    bot.chat(`/msg ${config.general.owner} [Highway] Digging tasks started`);
    require('./interaction/place')(bot).then(require('./interaction/break')(bot))
};