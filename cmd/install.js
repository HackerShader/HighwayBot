module.exports = {
    name: "install",
    description: "Executes the installation file for the bot",
    execute() {
        require('./installer/prepair')
    }
}