module.exports = {
    name: "exit",
    description: "Close the HighwayBot command line interface.",
    execute() {
        console.log('Closed HighwayBot command line interface.');
        process.exit(0);
    }
}