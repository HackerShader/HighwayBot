const fs = require('fs')
module.exports = {
    name: "help",
    description: "Displays all commands or info about a specific command.",
    execute() {
        console.log(`HighwayBot helper\n| Commands`)
        fs.readdirSync('cmd').forEach(file => {
            if (!file.endsWith('.js')) return;
            const cmd = require(`./${file}`)
            console.log(`|  | ${cmd.name} - ${cmd.description}`)
        })
        console.log(`|\n| Social / Contact\n|  | Discord: https://discord.gg/YSZPRkKNzh\n|  | Github: https://github.com/HackerShader/HighwayBot`)
    }
}