const fs = require('fs')
module.exports = {
    name: "help",
    description: "Displays all commands or info about a specific command.",
    exec() {
        console.log(`List of commands:\n| Miscellaneous:`)
        fs.readdirSync('cmd').forEach(file => {
            if (!file.endsWith('.js')) return;
            const cmd = require(`./${file}`)
            console.log(`|\t| ${cmd.name} - ${cmd.description}`)
        })
    }
}

