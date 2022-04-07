const fs = require('fs')

module.exports = (client) => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const pull = require(`../commands/${file}`);
        if (pull) {

        } else {
            client.command.set(pull.name, pull);
        }
    }
    console.log('Đã load Command!')
}