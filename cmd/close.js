module.exports = {
    name: "close",
    description: "Exit aliases",
    execute() {
        console.log('\x1b[33mClosed HighwayBot command line interface.\x1b[0m');
        process.exit(0);
    }
};