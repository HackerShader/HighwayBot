const fs = require('fs-extra')

module.exports = () => {
    fs.readdirSync('./config').forEach(file => {
        delete require.cache[require.resolve(`./../../config/${file}`)]
    })
    return console.log(`[Config | Reload] All Config files reloaded`)
}