const config = require(`../config/${require('../settings.json').config}`);

module.exports = {
    name: 'help',
    execute(bot) {
        bot.chat('/msg ' + config.general.owner + ' If you need help, please go to cli and type \' mchelp \' or visit https://highwaybot.tk/category/command');
    }
};
