const config = require(`../config/${require('../settings.json').config}`);
module.exports = {
    name: 'infoserver',
    execute(bot, args, username) {
        bot.chat(`/msg ${config.general.owner} [${config.ip}] TPS: ${bot.getTps()} - Players: ${Object.values(bot.players).map(name => name.username).length}`);
    }
};