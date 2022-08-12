const config = require(`../config/${require('../path.json').config}`);
const fs = require('fs-extra');
module.exports = {
    name: 'baritone',
    execute(bot, message, args, username) {
        let BaritoneCommands = '';
        if (!args[1]) {
            fs.readdirSync('./Core/Baritone/').forEach(file => {
                if (file.endsWith('.js')) {
                    let Baritonefile = file.split('.')[0];
                    BaritoneCommands += `${Baritonefile}, `;
                }
            });
            bot.chat(`/msg ${config.username} [Baritone] Commands: ${BaritoneCommands}`);
            return;
        }
        try {
            require(`./../Core/Baritone/${args[1]}`)(bot, args, username);
        } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') {
                bot.chat(`/msg ${config.username} [Baritone] | Error: ${args[1]} is not a valid command`);
            } else bot.chat(`/msg ${config.username} [Baritone] | Error: ${err}`);
        }
    }
};
