const color = require('./util/colorcode')
const string = require('../language/translate')

module.exports = {
    name: "clear",
    description: string('cli.clear.description'),
    aliases: ['cls', 'clr'],
    async execute() {
        console.clear();
        console.log(string('cli.clear.clear'));
    }
};