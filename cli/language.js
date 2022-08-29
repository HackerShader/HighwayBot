const consolelog = require('./util/translate');
const settings = require('../settings.json');
const color = require('./util/colorcode')
const editJsonFile = require('edit-json-file');

module.exports = {
    name: "language",
    description: "Language option",
    aliases: ['lang'],
    /**
     *
     * @param {String[]} args
     */
    async execute(args) {
        if (!args[1]) {
            await consolelog(color.code.blue, '[Language] using: ' + settings.lang);
            return await consolelog('',
                'If you want to change the language, use the command: \'language <language symbol>\'\n' +
                'Example:\n' +
                '\'language en\' for English\n' +
                '\'language vi\' for Vietnamese\n' +
                '\'language ja\' for Japanese\n' +
                '\'language zh\' for Chinese\n' +
                '\'language ko\' for Korean\n' +
                '\'language fr\' for French\n' +
                'And more...'
            );
        }
        const ToLowerCase = args[1].toLowerCase();
        if (ToLowerCase.length > 2) return await consolelog(color.code.red, '[Language] Not a valid language symbol (2 characters)');
        try {
            delete require.cache[require.resolve('../settings.json')];
            const consolelog_new = require('./util/translate')
            await consolelog_new('', 'language')
        } catch (err) {
            await console.log(err)
        } finally {
            const file = editJsonFile('./settings.json')
            file.set('lang', ToLowerCase);
            file.save();
            await consolelog(color.code.green, '[Language] Changed to ' + ToLowerCase);
        }
    }
};