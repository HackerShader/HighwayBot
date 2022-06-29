const fs = require('fs-extra');
fs.readdirSync('commands')
fs.writeFileSync('commands/infoserver.js',
    'module.exports = {\n' +
    '    name: \'infoserver\',\n' +
    '    execute(bot, username) {\n' +
    '        bot.chat(`/msg ${username} Current tps: ${bot.getTps()}`);\n' +
    '        bot.chat(`/msg ${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`);\n' +
    '    }    \n' +
    '}'
)