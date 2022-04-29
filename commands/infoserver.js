module.exports = {
    name: 'infoserver',
    execute(bot, message, args, username)  {
        bot.chat(`/msg ${username} Current tps: ${bot.getTps()}`);
        bot.chat(`/msg ${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`);

    }    
}

