const fs = require('fs')
const exec = require('child_process').exec

console.log(`Welcome to HighwayBot controller\nType \'help\' to see a list of commands\n`)

async function callback() {
    const prompt = require('prompt')
    prompt.start()
    prompt.get('commands', function (err, result) {
        if (!result) return;
        const toLowerCase = result.commands.toLowerCase()
        const args = toLowerCase.split(' ')
        try {
            if (!toLowerCase) return callback();
            const command = require(`./cmd/${args[0]}.js`)
            if (toLowerCase === `install` || toLowerCase === `update`) return require(`./cmd/${toLowerCase}.js`).execute();
            command.execute(args)
            callback()
        } catch (err) {
            console.log(`${args[0]}: command not found`)
            callback()
        }
    })
}
async function main() {
    if (fs.existsSync('./node_modules')) {
        callback()
    } else {
        fs.writeFileSync('./commandconfig.json', '{\n}')
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