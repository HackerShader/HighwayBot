const string = require('../language/translate')
const settings = require('../settings.json');
const color = require('./util/colorcode')
const editJsonFile = require('edit-json-file');

module.exports = {
    name: "language",
    description: string('cli.language.description'),
    aliases: ['lang'],
    /**
     *
     * @param {String[]} args
     */
    async execute(args) {
        if (!args[1]) {
            console.log(string('cli.language.default', settings.lang));
            return console.log(string('cli.language.how_to_use'));
        }
        const ToLowerCase = args[1].toLowerCase();
        if (ToLowerCase.length > 2) return console.log(string('cli.language.invalid'));
        try {
            delete require.cache[require.resolve('../settings.json')];
        } catch (err) {
            console.error(err)
        } finally {
            const file = editJsonFile('./settings.json')
            file.set('lang', ToLowerCase);
            file.save();
            console.log(string('cli.language.change', ToLowerCase))
        }
    }
};