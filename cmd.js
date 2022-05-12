const prompt = require('prompt')
const packages = require('./package.json')

console.log(`Welcome to HighwayBot controller\nHighwayBot version: ${packages.version}\nType \'help\' to see a list of commands\n`)

async function promptcallback() {
    prompt.start()
    prompt.get('commands', function (err, result) {
        try {
            if (!result.commands) return promptcallback();
            const command = require(`./cmd/${result.commands}.js`)
            command.execute()
            if (result.commands === `install`) {
                require('./cmd/install.js').execute()
            } else promptcallback()
        } catch (err) {
            if (!result) return;
            console.log(`${result.commands}: command not found`)
            promptcallback()
        }
    })
}

promptcallback()