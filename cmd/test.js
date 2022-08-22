const consolelog = require('./util/translate')

module.exports = {
    name: "test",
    description: "Development command",
    async execute() {
        await consolelog('', '[HighwayBot] Test');
    }
};