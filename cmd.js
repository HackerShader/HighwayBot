const fs = require('fs')
const exec = require('child_process').exec

console.log(`Welcome to HighwayBot controller\nType \'help\' to see a list of commands\n`)
async function callback() {
    const prompt = require('prompt')
    prompt.start()
    prompt.get('commands', function (err, result) {
        if (!result) return;
        const toLowerCase = result.commands.toLowerCase()
        try {
            if (!toLowerCase) return callback();
            const command = require(`./cmd/${toLowerCase}.js`)
            if (toLowerCase === `install`) return require('./cmd/install.js').execute();
            command.execute()
            callback()
        } catch (err) {
            console.log(`${toLowerCase}: command not found`)
            callback()
        }
    })
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        callback()
    } else {
        console.log('This is the first time you run this program, please wait while installing dependencies...')
        exec(`npm install prompt`, async (err, stdout, stderr) => {
            if (err) console.log(`${file}: ${err}`)
            await console.log('Dependencies installed')
            await callback()
        })
    }
}
main()











