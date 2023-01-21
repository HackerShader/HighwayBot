const config = require(`../config/${require('../settings.json').config}`);
const fs = require('fs-extra');
module.exports = {
    name: 'help',
    execute(bot, message, args, username) {
        bot.chat('/msg ' + config.general.owner + ' If you need help, please go to cli and type \' mchelp \' or visit https://highwaybot.tk/category/command');
    }
};
