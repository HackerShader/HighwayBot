const fs = require('fs-extra');
const ascii = require('ascii-table');

module.exports = (args) => {
    const table = new ascii().setHeading('Keys', 'Values');
    if (!args) return console.log(`[Config | Show] Usage: config show <filename>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Clone | Error] Config [${args}] does not exist\x1b[0m`);
    delete require.cache[require.resolve(`./../../config/${args}.json`)];
    const file = require(`../../config/${args}.json`);
    Object.keys(file).forEach(key => {
        let value;
        if (file[key]) value = (file[key]).toString();
        else value = null;
        table.addRow(key, value);
    });
    return console.log(table.toString());
};