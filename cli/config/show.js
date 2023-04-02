const fs = require('fs-extra');
const ascii = require('ascii-table');
const string = require('../../language/translate')

module.exports = (args) => {
    const table = new ascii().setHeading(string('cli._config.show.keys'), string('cli._config.show.values'));
    if (!args[1])
        return console.log(string('cli._config.show.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`))
        return console.log(string('cli._config.show.not_exist', args[1]));
    delete require.cache[require.resolve(`../../config/${args[1]}.json`)];
    const file = require(`../../config/${args[1]}.json`);

    //Improve Object showing
    /**
     * @param {Object} object 
     * @param {String} _key
     * @return {String}
     */
    function objectValue(object, _key) {
        let str = '';
        Object.keys(object).forEach((key) => {
            if (typeof object[key] == 'object') str += objectValue(object[key], (_key ? _key + '.' : '') + key)
            else str += `${_key ? _key + '.' : ''}${key}: ${object[key]}\n`;
        })
        return str
    }


    objectValue(file, null).split('\n').slice(0, -1).forEach((arg) => {
        const args = arg.split('');
        const i = args.indexOf(':');
        const key = args.slice(0, i).join('').toLowerCase();
        const value = args.splice(i + 1).join('');
        if (key !== '' && value !== '') table.addRow(key, value);
    });

    console.log(table.toString());
};