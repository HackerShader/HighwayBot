const config = require(`../config/${require('../path.json').config}`);
const fs = require('fs-extra');
module.exports = {
    name: 'help',
    execute(bot, message, args, username) {
        bot.chat('/msg ' + config.username + ' If you need help, please go to cli and type \' mchelp \' or visit https://highwaybot.tk/category/command');
    }
};
