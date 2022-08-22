const fs = require('fs');
const exec = require('child_process').exec;
const consolelog = require('./cmd/util/translate');
let cmds = []


console.log(`----- Welcome to HighwayBot controller -----\n`);

async function callback() {
    return new Promise(async (resolve, reject) => {
        const prompt = require('prompt');
        await prompt.start();
        await prompt.get('commands', async function (err, result) {
            if (!result) return;
            const toLowerCase = result.commands.trim().toLowerCase();
            const args = toLowerCase.split(' ');
            const noLowerArgs = result.commands.split(' ');
            const command = await cmds.find(cmd => cmd.name === args[0])
                || await cmds.find(
                    cmd =>
                        cmd.aliases != null && Array.isArray(cmd.aliases)
                            ? cmd.aliases.includes(args[0])
                            : false
                )
            try {
                if (!toLowerCase) return callback();
                if (toLowerCase === `install`
                    || toLowerCase === `update`) return require(`./cmd/${toLowerCase}.js`).execute();
                else if (command.name === 'config' && args[1] === 'edit'
                    || command.name === 'err') await command.execute(noLowerArgs);
                else if (command.name === 'help') await resolve(command.execute(args, cmds).then(() => callback()));
                else await resolve(command.execute(args).then(() => callback()));
            }
            catch (e) {
                if (!command) await consolelog('',`\x1b[31m%s\x1b[0m`, `[CMD | Error] [${args[0]}] is not a available command`);
                else await console.log(e.name + ': ' + e.message);
                await callback();
            }
        });
    });
}

async function handler() {
    await require('./cmd/util/handler')(cmds);
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        console.log('Type \'help\' to see a list of commands\n');
        await handler()
        await callback();
    } else {
        fs.writeFileSync('./path.json', '{\n}');
        console.log(color.code.yellow, '[Notification] This is the first time you run this program');
        console.log(color.code.yellow, '[Notification] Please wait while installing dependencies...');
        //process.stdout.write(color.code.blue, '[Notification] [] [0%]')
        let dependencies = [
            'prompt', 'edit-json-file', 'fs-extra', 'unzipper', 'superagent'
        ]
        let i = 0
        let instal = (package) => {
            exec(`npm instal ${package}`, (err, stdout, stderr) => {
                if (err) {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    console.log(color.code.red, `[Notification] ${err}`);
                    log();
                } else log()
            })
        }
        let log = async () => {
            i++
            if (i <= dependencies.length) {
                let str = ''
                for (let y = 0; y < i / dependencies.length * 20; y++) str += '■';
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                process.stdout.write(`${color.code.blue, `[Notification] [${Math.floor(i / dependencies.length * 100)}%]`} Installing ${dependencies[i - 1]}`);
                instal(dependencies[i - 1])
            } else {
                console.log('\x1b[32m[Notification] Dependencies installed!\x1b[0m');
                console.log('Type \'help\' to see a list of commands\n');
                await handler()
                await callback();
            }
        }
        log()
    }
}

main();
