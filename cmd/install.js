module.exports = {
    name: "install",
    description: "Executes the installaion file for the bot",
    execute() {
        require('./installer/prepair')
    }
}