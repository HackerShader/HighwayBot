const packages = require('./package.json')
const fs = require('fs')
const {absDependencies} = require("mathjs");
const childprocess = require('child_process').exec

async function promptcallback() {
    await console.log(`Welcome to HighwayBot controller\nHighwayBot version: ${packages.version}\nType \'help\' to see a list of commands\n`)
    const prompt = require('prompt')
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

function callprompt() {
    setTimeout(() => {
        promptcallback();
    }, 10000)
}

function createpackage() {
    childprocess(`npm install prompt`, (err, stdout, stderr) => {
        if (err) console.log(`${file}: ${err}`)
    })
    callprompt()
}

fs.readdirSync('./').forEach(file => {
    if (file.endsWith('.js')) return;
    if (file === 'node_modules') {
        return promptcallback()
    } else return createpackage()

})
