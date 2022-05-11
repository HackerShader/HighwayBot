const fs = require('fs');
fs.readdirSync('commands')
fs.writeFileSync('commands/reload.js', 'const fs = require(\'fs\');\n' +
    '\n' +
    'module.exports = {\n' +
    '    name: \'reload\',\n' +
    '    execute(bot)  {\n' +
    '        fs.readdirSync(\'./commands\').forEach(file => {\n' +
    '            if (!file.endsWith(\'.js\')) return;\n' +
    '            delete require.cache[require.resolve(`./${file}`)];\n' +
    '            bot.chat(`Reloaded ${file}`);\n' +
    '            console.log(`Reloaded ${file}`);\n' +
    '        });\n' +
    '        fs.readdirSync(\'./util\').forEach(files => {\n' +
    '            delete require.cache[require.resolve(`./../util/${files}`)];\n' +
    '            bot.chat(`Reloaded Util/${files}`);\n' +
    '            console.log(`Reloaded Util/${files}`);\n' +
    '        });\n' +
    '    }\n' +
    '}');