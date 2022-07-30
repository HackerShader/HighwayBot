module.exports = {
    name: "exit",
    description: "Close the HighwayBot command line interface.",
    aliases: ['close'],
    execute() {
        console.log('\x1b[33m[HighwayBot] Closed\x1b[0m');
        process.exit(0);
    }
};