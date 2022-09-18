const config = require(`../config/${require('../settings.json').config}`);
const file = require('edit-json-file')('./data/status.json');
module.exports = {
    name: 'mine',
    async execute(bot, args) {
        if (args[1] === 'stop') {
            file.set('stop', true);
            file.save();
            bot.chat(`/msg ${config.username} [Highway] Digging tasks stopped`);
        } else {
            file.set('stop', false);
            file.save();
            await require('../Core/HighwayTunnel/highwaybuildtool')(bot, args);
        }   
    }
};


