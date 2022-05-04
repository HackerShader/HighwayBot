module.exports = {
    name: "exit",
    description: "Close the HighwayBot command line interface.",
    exec() {
        console.log('Closed HighwayBot command line interface.');
        process.exit(0);
    }
}