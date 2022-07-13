const fs = require('fs');
const exec = require('child_process').exec;

console.log(`-----Welcome to HighwayBot controller-----\n`);

async function callback() {
    const prompt = require('prompt');
    prompt.start();
    prompt.get('commands', async function (err, result) {
        if (!result) return;
        const toLowerCase = result.commands.trim().toLowerCase();
        const args = toLowerCase.split(' ');
        const noLowerArgs = result.commands.split(' ');
        try {
            if (!toLowerCase) return callback();
            const command = require(`./cmd/${args[0]}.js`);
            if (toLowerCase === `install` || toLowerCase === `update` || toLowerCase === `runbot`) return require(`./cmd/${toLowerCase}.js`).execute();
            if (args[0] === 'config' && args[1] === 'edit') await command.execute(noLowerArgs);
            else await command.execute(args);
            callback();
        } catch (err) {
            console.log(`\x1b[31m${args[0]}: Command not found\x1b[0m`);
            callback();
        }
    });
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        console.log('Type \'help\' to see a list of commands\n');
        await callback();
    } else {
        fs.writeFileSync('./commandconfig.json', '{\n}');
        console.log('\x1b[33m[Notification] This is the first time you run this program, please wait while installing dependencies...\x1b[0m');
        exec(`npm install prompt`, async (err) => {
            if (err) console.log(`${err}`);
            exec('npm install edit-json-file', async (err) => {
                if (err) return console.log(err);
                exec(`npm install fs-extra`, async (err) => {
                    if (err) console.log(`${err}`);
                    console.log('\x1b[32m[Notification] Dependencies installed!\x1b[0m');
                    console.log('Type \'help\' to see a list of commands\n');
                    await callback();
                });
            });
        });
    }
}

main();