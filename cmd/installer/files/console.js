const fs = require('fs');
fs.readdirSync('util')
fs.writeFileSync('util/console/console.js', '/**\n' +
    ' * \n' +
    ' * @param {String} botPos \n' +
    ' * @param {String} blockPos \n' +
    ' * @param {String} status \n' +
    ' * @param {Boolean} clear \n' +
    ' */\n' +
    'module.exports = (botPos, blockPos, status, clear) => {\n' +
    '    if (clear) console.clear()\n' +
    '    console.log(`Position (X Y Z):\\n> Bot: ${botPos}.\\n> Block: ${blockPos}.\\nStatus: ${status}`)\n' +
    '}')