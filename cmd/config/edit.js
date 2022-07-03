const fs = require('fs-extra');
const prompt = require('prompt');

module.exports = (args) => {
    if (!args) return console.log(`[Config | Edit] Usage: config edit <filename>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Edit | Error] Config [${args}] don't exists\x1b[0m`);
    prompt.start();
    prompt.get([{
        name: 'username',
        description: 'Your bot account username',
        type: 'string',
        default: 'player',
        required: true
    },
    {
        name: 'password',
        description: 'Your bot account password (If the account is premium)',
        type: 'string',
        default: null,
        hidden: true,
        replace: '*',
        required: true
    },
    {
        name: 'ip',
        description: 'The server IP',
        type: 'string',
        allowEmpty: false,
        required: true
    },
    {
        name: 'port',
        description: 'The server port',
        type: 'number',
        default: 25565,
        required: true
    },
    {
        name: 'pin',
        type: 'array',
        minItems: 4,
        maxItems: 4,
        default: [0, 0, 0, 0],
        required: true
    },
    {
        name: 'invport',
        type: 'number',
        default: 8000,
        required: true
    },
    {
        name: 'prefix',
        type: 'string',
        description: 'Prefix of each bot command',
        default: '2w!',
        required: true
    }], (err, res) => {
        if (err)
            console.log(err);
        const file = require('edit-json-file')(`./config/${args}`);
        file.set('username', res.username);
        file.set('password', res.password);
        file.set('ip', res.ip);
        file.set('port', res.port);
        file.set('pin', res.pin);
        file.set('invport', res.invport);
        file.set('prefix', res.prefix);
    });
    console.log(`\x1b[32m[Config | Edit | Done] Edited [${args}] config.\x1b[0m`);
};