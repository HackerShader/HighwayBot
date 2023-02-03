const string = require('../language/translate')

module.exports = {
    name: "install",
    description: string('cli.install.description'),
    execute() {
        require('./installer/prepair');
    }
};