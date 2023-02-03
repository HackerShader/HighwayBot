const consolelog = require('./util/translate');
const string = require('../language/translate')
const ms = require('ms')

module.exports = {
    name: "info",
    description: string('cli.info.description'),
    aliases: ['about'],
    async execute() {
        const uptime = ms(process.uptime() * 1000);
        const dir = process.cwd();
        const info = require("../package.json");
        info.uptime = uptime
        info.dir = dir
        if (info.build === undefined) console.log(string('cli.info.not_install'));
        console.log(string('cli.info.info', info));
    }
};
