const consolelog = require('./util/translate')
const color = require('./util/colorcode')

module.exports = {
    name: "clear",
    description: "Clear the console",
    aliases: ['cls', 'clr'],
    async execute() {
        await console.clear();
        await consolelog(color.code.green, 'Console cleared');
    }
};