const fs = require('fs-extra');
const ascii = require('ascii-table');
const color = require('../../Core/Console/colorcode');

module.exports = (args) => {
    const table = new ascii().setHeading('Keys', 'Values');
    if (!args[2])
        return console.log(color.code.blue, `[Config | Show] Usage: config show <filename>`);
    if (!fs.existsSync(`./config/${args[2]}.json`))
        return console.log(color.code.red, `[Config | Clone | Error] Config [${args[2]}] does not exist.`);
    delete require.cache[require.resolve(`./../../config/${args[2]}.json`)];
    const file = require(`../../config/${args[2]}.json`);

    //Improve Object showing

    /**
     *
     * @param {Object} object
     * @param {String} key1
     */
    function objectShow(object, key1) {
        let str = '';
        Object.keys(object).forEach((key) => {
            let value;
            if (object[`${key}`]) value = object[`${key}`];
            else value = null;
            if (typeof value == 'object' && value != null) str = str + objectShow(value, key);
            else {
                if (key1) str = str + key1 + '.' + key + ': ' + value + '\n';
                else str = str + key + ': ' + value + '\n';
            }
        });
        return str;
    }

    objectShow(file, null).split('\n').slice(0, -1).forEach((args) => {
        let key, value, i = 0;
        args.split('').forEach((c) => {
            if (c === ':') {
                key = args.split('').slice(0, i).join('').toLowerCase();
                value = args.split('').splice(i + 1).join('');
            } else i++;
        });
        if (key !== '' && value !== '') table.addRow(key, value);
    });

    console.log(table.toString());
};