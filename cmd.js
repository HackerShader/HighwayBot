const packages = require('./package.json')
const fs = require('fs')
const childprocess = require('child_process').exec



console.log(`Welcome to HighwayBot controller\nHighwayBot version: ${packages.version}\nType \'help\' to see a list of commands\n`)
async function promptcallback() {
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

async function main() {
    if (fs.existsSync('./node_modules')) {
        promptcallback()
    } else {
        console.log('This is the first time you run this program, please wait while installing dependencies...')
        childprocess(`npm install prompt`, async (err, stdout, stderr) => {
            if (err) console.log(`${file}: ${err}`)
            await promptcallback()
        })
    }
}
main()











