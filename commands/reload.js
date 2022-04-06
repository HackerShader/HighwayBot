const fs = require('fs')

module.exports = {
    execute(bot, message, args, username) {
        fs.readdirSync('./commands').forEach(file => {
            if (file.endsWith('.js')) {
                delete require.cache[require.resolve(`./${file}`)]
                bot.chat(`Reloaded ${file}`)
            }
        })
        fs.readdirSync('./commands/util').forEach(files => {
            delete require.cache[require.resolve(`./util/${files}`)]
            bot.chat(`Reloaded util/${files}`)
        })
    }
}