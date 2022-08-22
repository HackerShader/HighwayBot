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
        fs.writeFileSync('./settings.json', JSON.stringify({
            lang: 'en',
        }));
        console.log('\x1b[33m[Notification] This is the first time you run this program, please wait while installing dependencies...\x1b[0m');
        await exec(`npm install prompt edit-json-file fs-extra unzipper superagent`, async (err) => {
            if (err) return  console.log(`${err}`);
            console.log('\x1b[32m[Notification] Dependencies installed!\x1b[0m');
            console.log('Type \'help\' to see a list of commands\n');
            await handler()
            await callback();
        });
    }
}

main();
