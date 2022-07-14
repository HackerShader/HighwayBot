const fs = require('fs-extra');
const ascii = require('ascii-table');

module.exports = (args) => {
    const table = new ascii().setHeading('Keys', 'Values');
    if (!args) return console.log(`[Config | Show] Usage: config show <filename>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Clone | Error] Config [${args}] does not exist\x1b[0m`);
    // delete require.cache[require.resolve(`./../../config/${args}.json`)];
    const file = require(`../../config/${args}.json`);

    //Improve Object showing

    /**
     *
     * @param {Object} object
     */
    function objectShow(object) {
        let str = '';
        Object.keys(object).forEach((key) => {
            let value;
            if (object[`${key}`]) value = object[`${key}`];
            else value = null;
            if (typeof value == 'object' && value != null) str = str + '{\n   ' + objectShow(value) + '}';
            else str = str + key + ': ' + value + ',\n';
        });
        return str;
    }

    return console.log(objectShow(file));
};