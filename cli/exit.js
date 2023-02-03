const consolelog = require('./util/translate')
const colors = require('./util/colorcode')
const string = require('../language/translate')

module.exports = {
    name: "exit",
    description: string('cli.exit.description'),
    aliases: ['close'],
    async execute() {
        console.log(string('cli.exit.exit'));
        process.exit(0);
    }
};