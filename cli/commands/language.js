const string = require('../language/translate')
module.exports = {
    name: "language",
    description: string('cli.language.description'),
    aliases: ['lang'],
    /**
     *
     * @param {String[]} args
     */
    async execute(args) {
        const editJsonFile = require('edit-json-file');
        if (!args[0]) {
            const settings = require('../settings.json');
            console.log(string('cli.language.default', settings.lang));
            return console.log(string('cli.language.how_to_use'));
        }
        const ToLowerCase = args[0].toLowerCase();
        if (ToLowerCase.length > 2) return console.log(string('cli.language.invalid'));
        try {
            delete require.cache[require.resolve('../settings.json')];
        } catch (err) {
            console.error(err)
        } finally {
            const file = editJsonFile('./settings.json')
            file.set('lang', ToLowerCase);
            file.save();
            delete require.cache[require.resolve('../settings.json')]
            require('../cmd').emitter.emit('language')
            console.log(string('cli.language.change', ToLowerCase))
        }
    }
};