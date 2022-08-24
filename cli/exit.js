const consolelog = require('./util/translate')
const colors = require('./util/colorcode')

module.exports = {
    name: "exit",
    description: "Close the HighwayBot command line interface.",
    aliases: ['close'],
    async execute() {
        await consolelog(colors.code.green,'[HighwayBot] Closed');
        process.exit(0);
    }
};