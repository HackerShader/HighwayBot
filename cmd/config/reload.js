const fs = require('fs-extra')

module.exports = () => {
    fs.readdirSync('./config').forEach(file => {
        delete require.cache[require.resolve(`./../../config/${file}`)]
    })
    return console.log(`\x1b[32m[Config | Reload] All Config files reloaded\x1b[0m`)
}