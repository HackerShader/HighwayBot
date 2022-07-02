const fs = require('fs-extra');
fs.readdirSync('Core');
fs.writeFileSync('Core/console/edit.js',
    'const editJsonFile = require("edit-json-file")\n' +
    '\n' +
    'module.exports = (name, value) => {\n' +
    '    const file = editJsonFile(\'./Core/console/status.json\')\n' +
    '    try {\n' +
    '        file.set(`${name}`, `${value}`)\n' +
    '        file.save()\n' +
    '    } catch (error) {\n' +
    '        console.log(error)\n' +
    '    }\n' +
    '}'
);