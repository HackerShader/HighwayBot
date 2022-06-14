const fs = require('fs')
const exec = require('child_process').exec

console.log(`Welcome to HighwayBot controller\nType \'help\' to see a list of commands\n`)
async function checkUpdate() {
    const editJsonFile = require('edit-json-file')
    exec(`git rev-parse HEAD`, async (err, stdout, stderr) => {
        const package = require('./package.json')
        if (package.build === undefined) return callback();
        if (stdout.substring(0, 7) === package.build) return callback();
        console.log(`[Notification | Update] Found new update, please run the \'update\' command to apply it\nBuild: ${editJsonFile('./package.json').get('build')} -> ${stdout.substring(0, 7)}`)
        callback()
    })
}
async function callback() {
    const prompt = require('prompt')

    prompt.start()
    prompt.get('commands', function (err, result) {
        if (!result) return;
        const toLowerCase = result.commands.toLowerCase()
        try {
            if (!toLowerCase) return callback();
            const command = require(`./cmd/${toLowerCase}.js`)
            if (toLowerCase === `install` || toLowerCase === `update`) return require(`./cmd/${toLowerCase}.js`).execute();
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
        checkUpdate()
    } else {
        fs.writeFileSync('./commandconfig.json', '{}')
        console.log('[Notification] This is the first time you run this program, please wait while installing dependencies...')
        await exec(`npm install prompt`, async (err, stdout, stderr) => {
            if (err) console.log(`${file}: ${err}`)
            await exec('npm i edit-json-file', async (err, stdout, stderr) => {
                if (err) return console.log(err)
                await exec(`npm install fs-extra`, async (err, stdout, stderr) => {
                    if (err) console.log(`${file}: ${err}`)
                    await console.log('[Notification] Dependencies installed')
                    await callback()
                })
            })
        })
    }
}
main()