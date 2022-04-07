const fs = require('fs')

module.exports = (client) => {
    const utilFiles = fs.readdirSync('./util').filter(file => file.endsWith('.js'));

    for (const file of utilFiles) {
        const pull = require(`../util/${file}`);
        if (pull) {

        } else {
            client.utils.set(pull.name, pull);
        }
    }
    console.log('Đã load Util!')
}