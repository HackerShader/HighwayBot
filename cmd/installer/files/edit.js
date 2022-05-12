const fs = require('fs')
fs.readdirSync('util')
fs.writeFileSync('util/console/edit.js', '/**\n' +
    ' * @param {String} name \n' +
    ' * @param {String} value \n' +
    ' */\n' +
    'module.exports = (name, value) => {\n' +
    '    const edit = require("edit-json-file")\n' +
    '        , file = edit(\'./status.json\')\n' +
    '    try {\n' +
    '        file.set(`${name}`, `${value}`)\n' +
    '        file.save()\n' +
    '    } catch (error) {\n' +
    '\n' +
    '    }\n' +
    '}')