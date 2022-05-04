module.exports = {
    name: "install",
    description: "Executes the installaion file for the bot",
    exec() {
        require('./installer/prepair')
    }
}