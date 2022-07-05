module.exports = {
    name: 'infoserver',
    execute(bot, msg, args, username) {
        bot.chat(`/msg ${username} TPS: ${bot.getTps()} - Players: ${Object.values(bot.players).map(name => name.username).length}`);
    }
};