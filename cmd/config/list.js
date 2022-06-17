const fs = require('fs-extra')

module.exports = async () => {  
    return console.log(`[Config | List] List of config files:\n${(fs.readdirSync('./config')).toString().replace(/,/g, '\n')}`)
}