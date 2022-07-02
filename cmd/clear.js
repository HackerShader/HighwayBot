module.exports = {
    name: "clear",
    description: "Clear the console",
    async execute() {
        console.clear();
        console.log('\x1b[32m✔ Console cleared\x1b[30m');
    }
};