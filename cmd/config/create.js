const fs = require('fs-extra');

module.exports = (args) => {
    if (!args && !fs.existsSync('./config/default')) {
        fs.writeFileSync(`./config/default.json`,
            '{\n' +
            '    "username": "player",\n' +
            '    "password": null,\n' +
            '    "ip": "localhost",\n' +
            '    "port": "25565",\n' +
            '    "pin": "0000",\n' +
            '    "invport": "8000",\n' +
            '    "prefix": "2w!"\n' +
            '}'
        );
        console.log(`\x1b[32m[Config | Create | Done] Created empty config [default].\x1b[0m`);
    } else {
        if (!args && fs.existsSync('./config/default')) return console.log(`[Config | Create] Usage: config create <filename>`);
        if (fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Create | Error] Config [${args}] already exists\x1b[0m`);
        fs.writeFileSync(`./config/${args}.json`,
            '{\n' +
            '    "username": "",\n' +
            '    "password": null,\n' +
            '    "ip": "",\n' +
            '    "port": "25565",\n' +
            '    "pin": "0000",\n' +
            '    "invport": "8000",\n' +
            '    "prefix": ""\n' +
            '}'
        );
        console.log(`\x1b[32m[Config | Create | Done] Created empty config [${args}]. Use 'config edit' to edit config.\x1b[0m`);
    }
};