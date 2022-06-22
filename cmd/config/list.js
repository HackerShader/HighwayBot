const fs = require('fs-extra')

module.exports = () => {
    return console.log(`[Config | List] List of config files:\n${(fs.readdirSync('./config')).toString().replace(/,/g, '\n')}`)
}