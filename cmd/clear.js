module.exports = {
    name: "clear",
    description: "Clear the console",
    aliases: ['cls', 'clr'],
    async execute() {
        console.clear();
        console.log('\x1b[32m✔%s\x1b[30m', 'Console cleared');
    }
};