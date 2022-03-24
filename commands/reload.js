const fs = require('fs')

module.exports = {
    execute(bot, message, args, username) {
        fs.readdirSync('./commands').forEach(file => {
            try {
                delete require.cache[require.resolve(`./${file}`)]
                bot.chat(`Reloaded ${file}`)
            } catch (error) {
                console.log(error)
                bot.chat(`Can\'t reload commands, reason : ${error}`)
            }
        })
    }
}