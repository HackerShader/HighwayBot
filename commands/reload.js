const fs = require('fs');

module.exports = {
    name: 'reload',
    execute(bot) {
        fs.readdirSync('./commands').forEach(file => {
            if (!file.endsWith('.js')) return;
            delete require.cache[require.resolve(`./${file}`)];
            bot.chat(`Reloaded ${file}`);
            console.log(`Reloaded ${file}`);
        });
        fs.readdirSync('./util').forEach(files => {
            delete require.cache[require.resolve(`./../util/${files}`)];
            bot.chat(`Reloaded Util/${files}`);
            console.log(`Reloaded Util/${files}`);
        });
    }
};