const fs = require('fs-extra');
const ascii = require('ascii-table')
const table = new ascii().setHeading('Keys', 'Values')

module.exports = (args) => {
    if (!args) return console.log(`[Config | Show] Usage: config show <filename>`);
    if (!fs.existsSync(`./config/${args}.json`))
        return console.log(`\x1b[31m[Config | Clone | Error] Config [${args}] does not exist\x1b[0m`);
    const file = require(`../../config/${args}`)
    Object.keys(file).forEach(key => {
        let value;
        if (file[key]) value = (file[key]).toString()
        else value = null;
        table.addRow(key, value)
    })
    return console.log(table.toString());
};