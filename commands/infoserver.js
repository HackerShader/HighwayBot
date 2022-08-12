const config = require(`../config/${require('../path.json').config}`);
module.exports = {
    name: 'infoserver',
    execute(bot, args, username) {
        bot.chat(`/msg ${config.username} [${config.ip}] TPS: ${bot.getTps()} - Players: ${Object.values(bot.players).map(name => name.username).length}`);
    }
};