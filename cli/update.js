const string = require('../language/translate')

module.exports = {
    name: "update",
    description: string('cli.update.description'),
    aliases: ['up'],
    async execute(args) {
        if(!args[1]) return;
        if (args[1] === `updaterl`) {
            require('./')
        } 
    }
};